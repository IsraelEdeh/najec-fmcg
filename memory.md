# Immigration Tracker — Working Memory

Running log of decisions, rules and changes so work can be picked up later.

## Project layout
- `app/main.py` — entry point (`--send-alerts` = headless reminder run for Task Scheduler).
- `app/immigration_tracker/rules.py` — all business rules (pure functions, no DB/UI).
- `app/immigration_tracker/services.py` — joins DB records + rules; dashboard tiles, action items, events.
- `app/immigration_tracker/notifications.py` — which reminders are due, email body, Outlook/SMTP, scheduler.
- `app/immigration_tracker/db.py` — SQLite (only user inputs stored; derived fields always recomputed).
- `app/immigration_tracker/excel_io.py` — import/export of the client workbook (header-based matching).
- `app/immigration_tracker/ui/` — PySide6 UI (pages, dialogs, widgets, theme, notifications page).
- Tests: `cd app; python -m pytest -q`.
- Reference only: `C:\Users\iedeh\Downloads\ImmigrationTrackerv0.1` (older, larger architecture: stage-based
  reminders, clickable dashboard tiles with drill-down, explicit flags/messages per item).

## Agreed functional rules (client meeting 11 Nov 2026 — Adesina & team)
| Item | Rule |
|---|---|
| EQ Expiry | Most recent FMI approval + 2 years (user edits FMI date in the app) |
| EQ Notification | 7 months before EQ expiry (was "renewal lead time") |
| CERPAC Notification #1 | 4 months before CERPAC expiry |
| CERPAC Notification #2 | 1 month before CERPAC expiry |
| Blackout close | 6 months before EQ expiry |
| Non-renewable | Based on first grant + maximum lifespan (discussed: 4 years; configurable in Data & Settings, pending business confirmation by Ayodeji) |
| Labels | Always prefix quota items with "EQ"; keep EQ and CERPAC metrics separate |

Non-renewable distinction (lifecycle column "Renewal"):
- `Renewable` — active, EQ expiry is before the lifespan end.
- `Final term` — active now, becomes non-renewable when it expires (expiry ≥ lifespan end).
- `Expired – renewable` — expired, still inside the lifespan (renewal possible).
- `Expired – non-renewable` — expired and past lifespan; cannot be renewed.

## "11 expired quotas" investigation (meeting item 7/8)
- Old dashboard tile "Quotas expired / lifespan" = EEPNL expired + EEPNL "lifespan ended" (active!) → mixed
  non-expired records in. Old "Overdue milestones" mixed EQ + CERPAC + quota milestones.
- 11 at meeting time ≈ 10 expired EEPNL quotas + 1 expired EQ position (AREA OPERATIONS MANAGER - DWO).
- Fix: separate tiles: Expired EQs (EQ positions), Expired EEPNL quotas, Expired CERPACs; each tile hint splits
  renewable vs non-renewable; tiles are clickable and open the filtered list.

## Change log
### 2026-11-16 — v0.2 (meeting follow-up)
- Rules: EQ notification (7 mo), CERPAC notices (4 mo + 1 mo), lifecycle/renewal states, configurable lifespan
  (default 4 yrs) applied to EQ validity and EEPNL non-renewable date (manual override still wins).
- Status labels renamed with EQ/CERPAC prefixes; milestone events carry type, expiry date and a plain-English trigger.
- Notifications: notice-type milestones (EQ 7 mo, CERPAC 4 mo / 1 mo, EEPNL 7 mo) send once when the notice date
  is reached (catch-up until expiry; 1-month CERPAC notice supersedes 4-month). Day-countdown reminders
  (7/3/1 days) remain for expiry/blackout milestones. DB migration v3 remaps saved milestone names.
- Dashboard: "Action required" list with trigger + next step; tiles grouped EQ / CERPAC / EEPNL, clickable.
- EQ page: bulk "Update FMI approval" for selected positions with EQ expiry preview.
- Excel export: headers relabelled (EQ EXPIRY, EQ NOTIFICATION…), CERPAC 1-month column, lifespan from setting.
- Milestones page (was "Alerts"): states Upcoming / Due now / Expired / Passed + plain-English Details column.
- Tests: 32 passing (`cd app; python -m pytest -q`), incl. offscreen UI test that every dashboard tile's count
  equals the filtered list it opens (`tests/test_ui_dashboard.py`).
- Rebuild exe: double-click `build_app.bat` in the tool root. It checks Python/packages, refuses if the app is
  open, runs the tests, builds `app\ImmigrationTracker.spec` in `%TEMP%\it_build`, moves the old
  `ImmigrationTracker.exe` + `_internal\` to `_build_backup_<timestamp>\`, then copies the new build in.
  It also regenerates `Client Guide - Immigration Tracker.html` from the .md (`python app\make_guide_html.py`).
- Re-import (`immigration_tracker/reimport.py`): matches by S/N+title (then unique title), shows New/Updated/
  Unchanged/Not in file, user picks "Update and add" (keeps app-only records) or "Replace". Blank dates and
  blank notes/movement in the file never erase app data; tables missing from the workbook are left untouched;
  one transaction; each change logged to Activity History.
- Escalation (DB v5): recipients have role Owner/Manager/Partner; `matter_status` table keyed by
  `notifications.matter_key` (source|position|person|expiry). Milestones page buttons set Not started /
  In progress / Done. Not started N days after first email -> stage 1 Owners again (3d), 2 Manager cc Owners (7d),
  3 Partner cc Owners+Managers (14d); stored in sent_alerts as key "ESC|<matter>", threshold -stage. Done also
  suppresses normal reminders. `escalate_since` (set at v5 upgrade) stops old notices escalating at rollout.

## Gotchas
- Don't pipe Python patch scripts containing non-ASCII (·, −, ≤) through PowerShell stdin — they get mangled.
- `QStackedLayout` inside cards with word-wrapped labels ignores child minimum heights → use visibility toggling.
- Offscreen screenshots need `QT_QPA_PLATFORM=offscreen` and `QT_QPA_FONTDIR=C:\Windows\Fonts`.
- Combo filters keep their values in a Python list (`TablePage._filter_data`); Qt `findData` can't match tuples.

## Open items / to confirm with client
- Ayodeji to confirm maximum quota lifespan (4 vs 6 years) — change in Data & Settings, no code change needed.
- Whether EEPNL register notifications should be on by default (currently on).
