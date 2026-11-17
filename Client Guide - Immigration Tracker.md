# Immigration Tracker — Client Guide

Immigration Tracker replaces the *Expatriate Quota & CERPAC Tracker* Excel workbook with a desktop app. It calculates every expiry, blackout and renewal date automatically, shows them on a dashboard, and emails reminders before things expire.

---

## 1. What you receive

A zip file containing:

| Item | Purpose |
|---|---|
| `ImmigrationTracker.exe` | The application |
| `_internal\` folder | Files the app needs — keep it next to the `.exe` |

**Requirements:** Windows 10/11. No Python, Excel or admin rights needed. Microsoft Outlook is only needed if you want email reminders sent through Outlook.

## 2. Install

1. Unzip to a permanent location, e.g. `C:\Users\<you>\Apps\ImmigrationTracker\` (avoid the Downloads folder).
2. Double-click `ImmigrationTracker.exe`.
3. If Windows shows **"Windows protected your PC"**, click **More info → Run anyway** (the app is not code-signed).
4. Optional: right-click the `.exe` → **Send to → Desktop (create shortcut)**.

> Do not move the `.exe` away from the `_internal` folder — the app will not start without it.

## 3. First-time setup: import your Excel tracker (once)

1. Open the app and go to **Data & Settings**.
2. Click **Choose workbook…** and select your *Expatriate Quota & CERPAC Tracker* `.xlsx` file.
3. Review the summary (number of EQ positions and EEPNL quotas found) and confirm.
4. If some rows have missing or unreadable dates, click **Show Details** to see exactly which rows to fix.

After this, **the app is your tracker** — you no longer need to maintain the Excel file.

**Tip:** if the workbook is saved next to the `.exe` with its original name, the app imports it automatically the first time it opens.

## 4. Everyday use

| Page | What it's for |
|---|---|
| **Dashboard** | Tiles grouped into **EQ positions**, **CERPAC** and **EEPNL quota register** (e.g. *EQ notification due*, *EQ in blackout*, *Expired EQs*, *Final-term EQs*, *CERPAC 4-month / 1-month notice*, *Expired CERPACs*, *Expired EEPNL quotas*). **Click any tile** to open the matching filtered list. Below: **Action required** (each record with *why it is flagged* and the *next step*; double-click to open it), **Upcoming milestones** and expiry charts. |
| **EQ & CERPAC** | All EQ positions with EQ status, Renewal, EQ expiry, EQ notification, blackout, lifespan end and both CERPAC notice dates. Filter by EQ status, Renewal or CERPAC status. **Update FMI approval…** sets a new FMI approval date for the selected rows at once (EQ expiry and notices recalculate). |
| **EEPNL Quotas** | Quota register with EQ status, Renewal, EQ expiry, EQ notification (7 months), lifespan end, category, movement (Moving Out / Hold) and notes. |
| **Milestones** | Every EQ, CERPAC and EEPNL milestone with its date, **Action** status (*Not started*, *In progress*, *Done*), expiry date, state (*Upcoming*, *Due now*, *Expired*, *Passed*) and a plain-English description. **Mark in progress / Mark done** stop escalation emails (see section 5). |
| **Notifications** | Email recipients and their roles (Owner, Manager, Partner), delivery, reminder schedule and escalation (see section 5). |
| **Activity History** | Read-only record of imports, the fields they changed, and action status changes, newest first. Search by position, field or value. |
| **Data & Settings** | Import / export Excel, restore previous data, theme, alert window, **maximum quota lifespan**. |

Dates and statuses recalculate automatically every day — nothing needs refreshing.

### Rules used

| Item | Rule |
|---|---|
| EQ expiry | Most recent FMI approval + 2 years (update the FMI approval date in the app when a renewal is approved) |
| EQ notification | 7 months before EQ expiry |
| EQ blackout | Closes 6 months before EQ expiry (no new expat or CERPAC renewal on that EQ) |
| CERPAC notifications | 4 months and 1 month before CERPAC expiry |
| Lifespan end | First grant + maximum quota lifespan (default 4 years, changeable in **Data & Settings**; an EEPNL non-renewable override date takes priority) |

**Renewal column:** *Renewable* · *Final term* (still active, but cannot be renewed once it expires) · *Expired – renewable* · *Expired – non-renewable* (cannot be renewed).

**Status colours:** green = on track / valid · amber = EQ notify / 4-month notice · orange = EQ blackout / 1-month notice / due now · red = expired · purple = final term · grey = vacant / not set.

## 5. Email notifications, recipients and escalation

### What gets sent

**Notices** are sent **once**, when the notice date is reached: **EQ notification 7 months** before EQ expiry, and **CERPAC notifications 4 months and 1 month** before CERPAC expiry (EEPNL quota 7-month notices too). If the PC was off, the notice still goes out until the expiry date; a CERPAC 1-month notice replaces a 4-month notice that was never sent. Optional **countdown reminders** (default 7, 3 and 1 days before) can be ticked for expiry and blackout dates.

If nobody acts on an item, the app **follows up and escalates** automatically, as described below.

### Who receives what: roles

Every recipient has a role:

| Role | Who | Receives |
|---|---|---|
| **Owner** | The team member(s) who do the work | Every notice and reminder, plus a second reminder if they haven't started |
| **Manager** | Their manager | Escalations only. The Owners are copied |
| **Partner** | The responsible partner or director | Final escalations only. The Owners and Managers are copied |

You can have several people in each role. Everyone in a role gets that role's emails.

### Add or change recipients

1. Open **Notifications**.
2. Under **Recipients**, type the **email address** and, optionally, the **name**.
3. Pick the **role**: *Owner*, *Manager* or *Partner*. It goes back to *Owner* after each person is added.
4. Click **+ Add**. Repeat for each person.
5. To change someone's role, select them in the list (Ctrl+click to select several), click **Change role…** and choose the new role.
6. **Pause / resume** stops or restarts emails to someone without removing them, e.g. during leave. **Remove** deletes them from the list.

> Add at least one **Manager** and one **Partner** if you want escalation to work. If an item needs escalating and nobody has that role, the app shows a warning in **Last check**. The escalation is held back and goes out as soon as someone with that role is added.

### How escalation works

After the first email about an item, the app checks every day whether someone has marked it **In progress** or **Done**. If it is still **Not started**:

| Days after the first email | Email goes to | Copied to |
|---|---|---|
| **3 days** | Owners: *second reminder* | — |
| **7 days** | **Manager**: *escalation* | Owners |
| **14 days** | **Partner**: *escalation* | Owners and Managers |

- Each step is sent **once**. If the PC was off, only the latest step reached is sent, never a backlog.
- Emails sent **before** escalation was installed only count from the day you installed it. Old notices don't jump straight to the partner.
- An "item" is one expiry of one position and expat. Renewing the expiry date starts a fresh cycle.

**Change the timing:** on **Notifications → Reminder schedule → Escalation**, set the days for **Owners again after**, **Manager after** and **Partner after**, then click **Save settings**. Set a step to **Off** to skip it. Untick **Escalate items still 'Not started'…** to turn escalation off completely. Each step must come after the previous one.

### Stop the reminders: mark items on the Milestones page

Escalation only happens when nobody records that work has started. When you pick up an item:

1. Open **Milestones** and find the item. Use the **All actions** filter to show only *Not started* items.
2. Select it (Ctrl+click to select several).
3. Click:
   - **Mark in progress**: you are working on it. **No more escalation.** The normal notices still arrive as deadlines get closer.
   - **Mark done**: finished. **All emails for that item stop.**
   - **Reset**: back to *Not started*, e.g. if it was marked by mistake.

The status applies to every milestone for the same expiry. Every status change is recorded in **Activity History** with who changed it and when.

> When a renewal is approved, also update the date (e.g. **Update FMI approval…** or the CERPAC expiry). The new expiry date then gets its own notices and escalation in due course.

### Delivery and first-time setup

1. Open **Notifications** and add your recipients as above.
2. **Delivery:** choose **Outlook** (sends from the Outlook account on this PC) or **SMTP server** (enter host, port, username, password and from address — the password is stored encrypted).
3. Tick **Send notification emails automatically**, choose the notices / countdown reminders, check the **Escalation** days → **Save settings**.
4. Click **Send test email**. It goes to every active recipient.
5. Click **Install background check** so emails go out even when the app is closed (runs daily at 08:00 and shortly after you sign in; catches up if the PC was off).

Each email lists the type (EQ / CERPAC / EEPNL), position, expat, expiry date, time left and what to do. Escalation emails also show when the item was first emailed and how many days it has been waiting. **Due now** lists what the next check will send, including follow-ups and escalations. The **Sent log** lists everything already sent, with *Sent as* showing *Notice*, *Second reminder (Owner)*, *Escalation to Manager* or *Escalation to Partner*.

> Reminders need the PC to be on and the user signed in. If Outlook blocks automated sending under company policy, switch to **SMTP**.

## 6. Importing again, backups and recovery

You can import a workbook again at any time, for example an updated tracker from a colleague. The app compares the file with what it already holds and shows you what will change before anything is saved:

| Result | Meaning |
|---|---|
| **New** | In the file but not in the app — it will be added |
| **Updated** | In both, with different values — the file's values are applied (click **Show Details** to see each change) |
| **Unchanged** | Identical — nothing happens |
| **Not in this file** | Only in the app (e.g. added in the app since the last import) |

Then choose:

- **Update and add** (recommended) — applies the changes and adds new records. Records that are only in the app are **kept**.
- **Replace** — the same, but records that are not in the file are **removed** (you are asked to confirm).
- **Cancel** — nothing is changed.

Good to know:

- Records are matched by **S/N and title**, or by title alone if the S/N was renumbered.
- **Nothing is duplicated**. Importing the same file twice says *Already up to date*.
- A **blank date** in the file never erases a date already in the app. A **blank expat** name means the position is now vacant.
- Notes and EQ ↔ quota links added in the app are kept.
- If the workbook has only one of the two tables (EQ & CERPAC or EEPNL quotas), the other list in the app is **not touched**.
- Notices already emailed are **not sent again** after an import.
- Every import and every changed field is listed in **Activity History**.
- A backup is saved automatically before each import. To undo one: **Data & Settings → Restore previous data…** and pick the backup by date/time.
- If the file isn't a tracker, is damaged, password-protected, or missing required columns, the app explains what's wrong and **your current data is left untouched**.
- **Export workbook…** creates an Excel copy (original layout with live formulas) for sharing, reporting or archiving.

## 7. Where data is stored

| What | Location |
|---|---|
| Tracker data | `%APPDATA%\ImmigrationTracker\tracker.db` |
| Automatic backups (last 10) | `%APPDATA%\ImmigrationTracker\backups\` |
| Reminder log / error log | `%APPDATA%\ImmigrationTracker\alerts.log`, `error.log` |

Data is per Windows user on each PC. To move to a new PC, export to Excel and import it there (or copy `tracker.db`).

## 8. Troubleshooting

| Problem | Fix |
|---|---|
| App doesn't start | Make sure `_internal` is in the same folder as the `.exe`; unzip again if needed. |
| "Windows protected your PC" | **More info → Run anyway**. |
| Import says the file can't be read | Open it in Excel, **Save As → Excel Workbook (.xlsx)** without a password, and retry. |
| Import says a column is missing | Check the header row contains *EQ POSITION TITLE*, *FIRST GRANT* and *MOST RECENT FMI APPROVAL* (and *QUOTA POSITION TITLE*, *DATE OF FIRST GRANT*, *EXPIRY DATE* for quotas). |
| Test email fails (Outlook) | Open Outlook once and sign in, then retry; or use SMTP. |
| No reminders arriving | Check **Notifications**: recipients active, automatic sending ticked, background check installed, and the "Last check" line. |
| Manager / Partner never get escalations | Make sure someone has that role in **Recipients** and is *Active*, escalation is ticked, and the step isn't set to *Off*. Items marked *In progress* or *Done* are never escalated. |
| Escalations keep coming for an item we're handling | On **Milestones**, select the item and click **Mark in progress** (or **Mark done** when finished). |
| Something went wrong message | Your data is safe. Send `%APPDATA%\ImmigrationTracker\error.log` to support. |
| Wrong old version opens | Delete any older copies of `ImmigrationTracker.exe` (e.g. on the Desktop) and use the new one. |
