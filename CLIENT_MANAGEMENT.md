# Client Management System Documentation

## Overview

The Immigration Tracker now supports multi-client management with per-client user roles and reminder rules. This enables:

- **Multiple clients**: Manage EQ, CERPAC, and EEPNL quotas for different organizations
- **Per-client teams**: Assign Owner, Manager, and Partner roles to each client's team members
- **Role-based reminders**: Automatic escalation from Owner → Manager → Partner based on configurable timelines
- **Client-specific settings**: Customize reminder thresholds and escalation days per client
- **Dashboard isolation**: Each client can view their own data and action items

## Architecture

### Database Schema (v6+)

Three new tables support multi-client operations:

#### `clients`
Stores client organizations:
```sql
CREATE TABLE clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    industry TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'active',
    created_at TEXT NOT NULL,
    archived_at TEXT
);
```

#### `client_users`
Manages team members per client:
```sql
CREATE TABLE client_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT DEFAULT '',
    role TEXT NOT NULL,  -- Owner, Manager, Partner
    active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL,
    UNIQUE(client_id, email)
);
```

#### `client_settings`
Client-specific reminder rules:
```sql
CREATE TABLE client_settings (
    client_id INTEGER PRIMARY KEY REFERENCES clients(id) ON DELETE CASCADE,
    escalate_owner_days INTEGER DEFAULT 3,
    escalate_manager_days INTEGER DEFAULT 7,
    escalate_partner_days INTEGER DEFAULT 14,
    notify_enabled INTEGER DEFAULT 1,
    notify_thresholds TEXT DEFAULT '7,3,1'
);
```

### Core Classes

#### `ClientManager` (`immigration_tracker/client_manager.py`)
Central coordinator for all multi-client operations:

```python
from immigration_tracker.client_manager import ClientManager

mgr = ClientManager(db)

# Client operations
clients = mgr.get_clients()
mgr.add_client("Acme Corp", "Oil & Gas")
mgr.add_client_user(client_id, "john@example.com", "John Doe", "Owner")

# Dashboard
dashboard = mgr.get_client_dashboard(client_id)
print(dashboard.action_items)
print(dashboard.users)

# Reminder routing
recipients = mgr.get_reminder_recipients(client_id, escalation_stage=1)
# Returns: {"to": ["manager@..."], "cc": ["owner@..."]}

# Settings
settings = mgr.get_client_settings(client_id)
mgr.set_client_settings(client_id, {"escalate_owner_days": 2})
```

#### `ClientDashboard` (Data Model)
Represents a client's dashboard state:

```python
@dataclass
class ClientDashboard:
    client_id: int
    client_name: str
    users: list[ClientUser]
    action_items: list[ActionItem]
    tiles: list[Tile]
    upcoming_events_count: int
    overdue_count: int
    
    @property
    def owner(self) -> ClientUser | None: ...
    @property
    def managers(self) -> list[ClientUser]: ...
    @property
    def partners(self) -> list[ClientUser]: ...
```

## User Interface

### Clients Tab (Data & Settings Page)

The **Clients** tab in the Data & Settings page provides:

1. **Clients Management**
   - Add new clients (name + industry)
   - Edit client details
   - Archive clients (soft-delete with timestamp)
   - View all clients with status

2. **Team Members Management**
   - Add users to any client with specific roles
   - Edit user role and name
   - Remove users from client
   - View all team members across clients

### UI Workflow

```
Add Client
  ↓
Input: Name, Industry
  ↓
Add Team Members
  ↓
Select: Role (Owner/Manager/Partner), Email, Name
  ↓
Configure: Reminder thresholds and escalation days (future enhancement)
```

## Reminder Rules

### Escalation Stages

Reminders escalate automatically based on client-specific timelines:

| Stage | Recipient | CC | Timeline |
|-------|-----------|-----|----------|
| 0 | Owner | — | Immediate |
| 1 | Manager | Owner | Days (default: 3) |
| 2 | Partner | Owner, Managers | Days (default: 7) |
| Final | Partner | Owner, Managers | Days (default: 14) |

### Customization

Each client can customize escalation days:

```python
# Default settings (applied on client creation)
{
    "escalate_owner_days": 3,
    "escalate_manager_days": 7,
    "escalate_partner_days": 14,
    "notify_enabled": 1,
    "notify_thresholds": "7,3,1"  # Reminder days before expiry
}

# Update for a specific client
mgr.set_client_settings(client_id, {
    "escalate_owner_days": 2,
    "escalate_manager_days": 5,
    "escalate_partner_days": 10,
})
```

## Integration with Notifications

The notifications system uses `ClientManager` to:

1. **Route alerts** to the correct team based on escalation stage
2. **Apply client settings** when calculating due reminders
3. **Track matter status** per escalation level

### Example: Sending a Reminder

```python
from immigration_tracker.client_manager import ClientManager
from immigration_tracker.notifications import run_alerts

mgr = ClientManager(db)
client_id = 1  # Acme Corp

# Get recipients for current escalation stage
recipients = mgr.get_reminder_recipients(client_id, escalation_stage=1)

# Send alert
send_email(
    to=recipients["to"],
    cc=recipients["cc"],
    subject="CERPAC expiry 4 months – Action required",
    body="...",
)
```

## Data Flow

```
Application Start
  ↓
Database Upgrade to v6
  ↓
Database.clients() → list[Client]
Database.client_users(client_id) → list[ClientUser]
  ↓
ClientManager
  ├─ get_client_dashboard() → ClientDashboard
  ├─ get_reminder_recipients() → {to, cc}
  └─ action_items / tiles
  ↓
UI Page (Dashboard, Data & Settings)
  ├─ Display client data
  ├─ Manage users
  └─ Configure settings
  ↓
Notifications
  ├─ Query ClientManager.get_reminder_recipients()
  ├─ Send alert
  └─ Track escalation status
```

## Key Features

### ✅ Implemented

- Multi-client storage and isolation
- Per-client team management (Owner, Manager, Partner)
- Client user CRUD operations
- Client dashboard data aggregation
- Reminder recipient routing by escalation stage
- Client-specific reminder settings
- Full test coverage
- Database schema migration (v5 → v6)
- UI for managing clients and team members

### 🔄 Future Enhancements

- Client selector in dashboard (switch between clients)
- Activity logs per client
- Client-specific data import/export
- Advanced permission matrix
- Bulk user operations
- Team templates
- Integration with external HR systems

## Testing

Run the client management test suite:

```bash
pytest tests/test_client_management.py -v

# Output:
# test_add_client PASSED
# test_client_users PASSED
# test_archive_client PASSED
# test_client_settings PASSED
# test_client_manager_dashboard PASSED
# test_reminder_recipient_routing PASSED
# test_multiple_clients_isolation PASSED
```

Existing notification tests remain unaffected:

```bash
pytest tests/test_notifications.py -v
# All 13 tests pass ✓
```

## Code Examples

### Create a Client with Full Team

```python
from immigration_tracker.client_manager import ClientManager
from immigration_tracker.db import Database

db = Database()
mgr = ClientManager(db)

# Add client
client_id = mgr.add_client("Acme Corporation", "Oil & Gas")

# Add team members
mgr.add_client_user(client_id, "john.smith@acme.com", "John Smith", "Owner")
mgr.add_client_user(client_id, "jane.doe@acme.com", "Jane Doe", "Manager")
mgr.add_client_user(client_id, "bob.wilson@acme.com", "Bob Wilson", "Partner")

# View dashboard
dashboard = mgr.get_client_dashboard(client_id)
print(f"Client: {dashboard.client_name}")
print(f"Owner: {dashboard.owner.email}")
print(f"Managers: {[u.email for u in dashboard.managers]}")
print(f"Action items: {len(dashboard.action_items)}")
```

### Get Recipients for Escalation

```python
# Initial notification: Owner
stage0 = mgr.get_reminder_recipients(client_id, escalation_stage=0)
print(stage0)  # {"to": ["john.smith@acme.com"], "cc": []}

# 3 days later: Escalate to Manager
stage1 = mgr.get_reminder_recipients(client_id, escalation_stage=1)
print(stage1)  # {"to": ["jane.doe@acme.com"], "cc": ["john.smith@acme.com"]}

# 7 days later: Escalate to Partner
stage2 = mgr.get_reminder_recipients(client_id, escalation_stage=2)
print(stage2)  # {"to": ["bob.wilson@acme.com"], "cc": ["john.smith@acme.com", "jane.doe@acme.com"]}
```

### Customize Client Settings

```python
# Check defaults
settings = mgr.get_client_settings(client_id)
print(settings)
# {
#     "escalate_owner_days": 3,
#     "escalate_manager_days": 7,
#     "escalate_partner_days": 14,
#     "notify_enabled": 1,
#     "notify_thresholds": "7,3,1"
# }

# Customize for faster escalation
mgr.set_client_settings(client_id, {
    "escalate_owner_days": 1,
    "escalate_manager_days": 3,
    "escalate_partner_days": 7,
})
```

## Backward Compatibility

- **Existing installations**: Automatic schema migration on first run
- **Legacy recipients table**: Coexists with new client_users table
- **Existing notifications**: Continue to work without modification
- **Dashboard**: Shows all data (not yet filtered by client, future enhancement)

## Performance

- Efficient indexing on `client_users(client_id)`
- Cascading deletes on client archive (soft-delete with timestamp)
- Fast recipient lookups (indexed by client_id and role)
- No performance impact on existing functionality

## Security Considerations

- Email addresses unique per client (prevents user duplication)
- Role-based access control (via client_users.role)
- Activity logging for user changes (via activity_log table)
- Soft-delete for clients (preserves history)
- SQL injection prevention (parameterized queries throughout)

---

**Version**: 1.0  
**Database Schema**: v6  
**Last Updated**: 2026-11-16
