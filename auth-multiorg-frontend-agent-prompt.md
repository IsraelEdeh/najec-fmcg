# Frontend Implementation Prompt: Login, Organization Context and ESS Payslips (Bug 6)

You are updating the Neptune (HR/Payroll) frontend to match the **final backend**. Frontend only: do not change
backend contracts. Data isolation between organizations is the top priority.

## Rules

- Inspect only what you need: router/app shell, auth module (Azure AD/MSAL + token exchange), API client
  (token injection, error interceptor), token/session storage, header, data-fetching/cache layer, the employee
  bulk-upload screen and the ESS payslip screens. Reuse existing patterns.
- No new packages without asking. No unrelated refactors.
- Ambiguity: choose the safest option, mark it `// ASSUMPTION:` and list it in your summary.

## Conventions

- JSON is camelCase.
- Standard envelope: `{ "message": string|null, "errors": any|null, "data": any }`.
- Paged envelope: `{ "message", "errors", "data": [...], "meta": { pageNumber, pageSize, totalCount, totalPages,
  firstPage, lastPage, nextPage, previousPage, dataReport } }`.
- Every Neptune API call sends `Authorization: Bearer <Neptune token>` (except token exchange, which sends the
  Azure AD token).
- A missing/invalid/expired Neptune token on a protected endpoint → **401** `{ "message": "Unauthorized: token required" }`
  (expired tokens may return the plain text `Token expired`). Inactivity > 30 min → **401**
  `{ "message": "Session expired due to inactivity." }`.
- Missing role **in the current organization** → **403** `{ "message": "Access Denied: You do not have the required permission." }`.

## 1. Login – token exchange

```http
POST /api/auth/exchange-token
Authorization: Bearer <Azure AD access token>     (v1 or v2 Azure AD tokens are accepted)
```

**200 – only when a token was issued:**

```json
{
  "message": "Token exchange successful",
  "data": {
    "id": "user-guid", "firstName": "Ada", "middleName": null, "lastName": "Obi",
    "email": "ada.obi@company.com", "gender": 0, "isActive": true, "countryId": 1,
    "staffNumber": "STF001", "isVerified": true,
    "roles": [{ "role": "Admin", "rank": 5 }],
    "token": "<Neptune JWT>"
  }
}
```

- The token is always bound to **one valid organization** when the user belongs to any: the last-used/default
  organization if the user is still a member, otherwise the first organization where the user has a role,
  otherwise the first organization. A hidden "Control Centre" organization is never chosen for users who are not
  allowed to see it. **No org picker is required** for the UI to work.
- `roles` contains only the roles for that organization (not a union across organizations).
- Token claims include `org_id` and `CurrentOrganizationId` (same value).

**Failures – always non-2xx, `errors: true`, never a token:**

```json
{ "message": "Your account is inactive. Contact your administrator.", "errors": true,
  "data": { "errorCode": "account_inactive", "correlationId": "00-…" } }
```

| Status | `data.errorCode` | `message` |
|---|---|---|
| 400 | `email_missing` | "Email not found in the Azure AD token." |
| 403 | `account_inactive` | "Your account is inactive. Contact your administrator." |
| 403 | `account_not_found` | "No Neptune account exists for this email. Contact your administrator." |
| 409 | `duplicate_account` | "More than one Neptune account uses this email. Contact your administrator to merge the accounts." |
| 500 | `token_issue_failed` | "We couldn't sign you in right now. Please try again later." |
| 500 | `unexpected_error` | "We couldn't sign you in right now. Please try again later. Reference: {correlationId}" |
| 401 | – | Azure AD token itself missing/invalid: `{ "message": "Unauthorized: token required" }` |

### Required handling

- Success **only if** status is 2xx **and** `errors` is not `true` **and** `data.token` is a non-empty string.
- Otherwise: stop the login flow, **store nothing** (clear any partial auth state), show the server `message`
  (403 `account_inactive` and 409 `duplicate_account` explicitly), show the `correlationId` as a small
  "Reference" for 5xx, and **stay on the login screen**. Never fall back to the Azure AD token and never call
  other APIs after a failed exchange.

## 2. Organizations

```http
GET /api/auth/my-organizations
```

`200` → `data: [{ "organizationId": 12, "organizationName": "Org A", "role": [{ "role": "Admin", "rank": 5 }],
"isCurrentLoggedInOrganization": true }]` (roles are per organization).

```http
GET /api/auth/loggedin-user
```

`200` → `data: { userId, email, userName, firstName, lastName, currentOrganizationId, roles: [{ role, rank }],
userOrganizations: [same shape as my-organizations], isUserProfileCompleted, country }` — `roles` are the
current organization's roles. `400` `{ "message": "User not found", "errors": true }` if the token has no user.

### Switch organization

```http
POST /api/auth/switch/{organizationId}
```

- `200` → same `data` shape as exchange-token, with a **new token** for that organization and that
  organization's roles. The backend remembers it as the default for the next sign-in.
- `400` `{ "message": "You do not belong to the selected organization.", "errors": true }`.
- `500` token-issue failure as in the exchange table.

### Required handling

- After a successful exchange, store the token, then call `my-organizations`.
- Show the **current organization name** in the header (`isCurrentLoggedInOrganization: true`).
- Optional org picker for users with more than one organization: on selection call `switch/{id}`, replace the
  stored token/user/roles with the response; on failure keep the current organization and show the message.
- If the user belongs to no organization, show "You are not assigned to any organization. Contact your administrator."
- Menus/route guards use the **current** organization's roles only.
- On org switch, logout and login, clear **all** organization-scoped cache (payslips, employees, users, payroll,
  reports, dashboards, selections). Include the organization id in cache/query keys and ignore responses of
  requests started under the previous organization.
- 403 → "You don't have permission for this in the current organization" (do not log out).

## 3. Employees

### Bulk upload

```http
POST /api/employees/bulk-upload-employees     (multipart/form-data, same file as before)
```

- File-level validation failure → `400 { "message": "Validation errors found", "errors": ["Row 3: A valid Email is required", "Duplicate StaffNumber '3' found in rows 2, 5.", …] }`.
- Otherwise every row is processed and reported:

```json
{
  "message": "3 created, 1 linked, 2 skipped",
  "data": [
    { "rowNumber": 2, "email": "ada@company.com", "staffNumber": "STF001", "outcome": "created", "reason": null },
    { "rowNumber": 3, "email": "x@company.com",   "staffNumber": "STF002", "outcome": "linked",  "reason": "Existing account added to this organization." },
    { "rowNumber": 4, "email": "sample@sample.com","staffNumber": "STF003", "outcome": "skipped", "reason": "Email appears more than once in the file. Each employee needs their own email." }
  ]
}
```

- Status: **200** when at least one row was created or linked; **400** when none were — then the same row list
  is in `errors` (and `message` still has the counts).
- `outcome`: `created` (new account, active), `linked` (existing account from another organization added to this
  one), `skipped` (see `reason`). Possible skip reasons include: "Email is required.", "Email appears more than
  once in the file…", "More than one account uses this email…", "Already an employee of this organization.",
  "Email is already used by staff number {n} in this organization.", "An account with this email already exists
  with staff number {n}…", or an account-creation error (e.g. invalid characters in the email).
- Staff numbers are compared trimmed, case-insensitive, and ignoring leading zeros for all-digit values
  ("0003" = "3").

**UI:** show the counts and a table of rows (outcome + reason), with skipped rows highlighted.

### Delete employee / delete user

Existing endpoints, unchanged contract. Behaviour change for messaging: deleting removes the person **from the
current organization only** (that organization's Employee role, plus membership if no other role remains). The
person's account, other organizations and payslips are kept.

## 4. ESS payslips (`/api/ess/payslips`, Employee role in the current organization)

All data is for the **signed-in user in the current organization only**. The frontend never sends an employee id.

| Method & route | Success | Empty / not found |
|---|---|---|
| `GET /current` | `200 { message, data: <payslip> }` | **`200 { "message": "No published payslips found.", "data": null }`** |
| `GET /?year=&month=&payrollType=Regular\|OffCycle&pageNumber=1&pageSize=12` | `200` paged envelope, newest first | **`200` with `data: []`**, `meta.totalCount: 0` |
| `GET /{payslipId}` | `200 { data: <payslip> }` | `404 { "message": "Payslip not found." }` (not found or not yours) |
| `GET /{payslipId}/pdf` | `200` `application/pdf`, attachment, server filename | `404` as above |
| `GET /{payslipId}/print` | `200` same PDF, `Content-Disposition: inline` | `404` as above |
| `POST /download-zip` body `{ "payslipIds": [1,2] }` | `200` `application/zip` (streamed) | `400` empty list / more than 24 / duplicate ids; `404` if any id is not yours |
| `GET /ytd?year=YYYY` (default current year) | `200 { data: <ytd> }` | **`200`**, `message: "No published payslips found."`, `data` = zero totals and 12 zero monthly rows |
| `GET /compare?periodA=YYYY-MM&periodB=YYYY-MM&payrollType=Regular` | `200 { data: <comparison> }` | `404` if either period has no published payslip; `400` bad period format |

- `400` on list for invalid month/year/paging: `{ "message": "Month must be between 1 and 12." }` etc.
- `403` if the user has no Employee role in the current organization (e.g. Admin-only there).
- Payslip `data`: `{ payslipId, payrollType, offCycleDescription, offCycleRunId, currencyCode,
  header: { employeeName, staffId, department, grade, organizationName, payPeriodStart, payPeriodEnd, payDate,
  bankName, maskedAccountNumber, maskedRsaPin, maskedTin }, earnings: [{ payComponentId, name, category, amount }],
  deductions: [same; category PAYE|Pension|NHF|Loan|Other], totals: { grossPay, totalDeductions, netPay,
  roundingDifference, netPayAfterRounding }, ytd: <ytd>|null }`.
- List item: `{ payslipId, payrollType, offCycleDescription, payPeriodStart, payPeriodEnd, payDate, currencyCode,
  grossPay, totalDeductions, netPay }`.
- YTD: `{ year, currencyCode, grossPay, paye, pension, nhf, otherDeductions, netPay,
  monthlyBreakdown: [{ month, monthName, grossPay, paye, pension, nhf, otherDeductions, netPay } ×12] }`.
- Comparison: `{ periodA, periodB, payrollType, currencyCode, components: [{ name, amountA, amountB, change,
  changePercent|null }], totals: { grossPay, totalDeductions, netPay } }` (same row shape).

**UI:** treat `data: null` / empty list / zero YTD as a friendly empty state ("No payslips have been published
yet"), not an error. Show 404 only as "Payslip not available". Clear payslip caches on org switch.

## Tests (existing frontend framework)

1. Exchange 200 with token → stored, app loads, `my-organizations` called, header shows current org.
2. Exchange 403 `account_inactive` / 409 `duplicate_account` / 500 → message shown (reference for 500), nothing
   stored, stays on login, no further API calls.
3. Exchange 200 without `data.token`, or with `errors: true` → treated as failure.
4. Multi-org user without a picker → lands in the token's organization and works.
5. Org switch (if picker added) → new token stored, caches cleared, data refetched.
6. Role-based UI uses current-org roles only.
7. Bulk upload renders created/linked/skipped rows; 400 with row list renders the same table.
8. ESS: `current` with `data: null`, empty list and zero YTD render empty states (no error toast); 404 on a
   payslip id renders "not available".

## Completion

Run the focused tests and the repo's type-check/lint/build. Report files changed, tests run, assumptions and blockers.
