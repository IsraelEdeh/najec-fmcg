"""
Quick Start Guide: Using Multi-Client Management in Immigration Tracker

This guide shows how to quickly get started with the new client management system.
"""

# ============================================================================
# QUICK START: CREATE YOUR FIRST CLIENT
# ============================================================================

from immigration_tracker.db import Database
from immigration_tracker.client_manager import ClientManager

# Initialize
db = Database()  # Uses default location: ~/.ImmigrationTracker/tracker.db
mgr = ClientManager(db)

# Create a client
client_id = mgr.add_client("Acme Corporation", "Oil & Gas")
print(f"Created client {client_id}: Acme Corporation")

# ============================================================================
# ADD TEAM MEMBERS
# ============================================================================

# Add Owner (receives initial notifications)
owner_id = mgr.add_client_user(client_id, "john.smith@acme.com", "John Smith", "Owner")
print(f"Added Owner: john.smith@acme.com")

# Add Manager (escalation stage 1, after 3 days)
manager_id = mgr.add_client_user(client_id, "jane.doe@acme.com", "Jane Doe", "Manager")
print(f"Added Manager: jane.doe@acme.com")

# Add Partner (escalation stage 2, after 7 days)
partner_id = mgr.add_client_user(client_id, "bob.wilson@acme.com", "Bob Wilson", "Partner")
print(f"Added Partner: bob.wilson@acme.com")

# ============================================================================
# VIEW CLIENT DASHBOARD
# ============================================================================

dashboard = mgr.get_client_dashboard(client_id)

print(f"\n--- Dashboard for {dashboard.client_name} ---")
print(f"Owner: {dashboard.owner.email if dashboard.owner else 'Not assigned'}")
print(f"Managers: {[u.email for u in dashboard.managers]}")
print(f"Partners: {[u.email for u in dashboard.partners]}")
print(f"Action items: {len(dashboard.action_items)}")
print(f"Upcoming events (30 days): {dashboard.upcoming_events_count}")
print(f"Overdue items: {dashboard.overdue_count}")

# ============================================================================
# SEND ALERT WITH AUTOMATIC ESCALATION
# ============================================================================

def send_alert(client_id, days_waiting):
    """Demonstrate automatic escalation."""
    
    # Determine escalation stage based on days waiting
    if days_waiting < 3:
        stage = 0  # Owner
    elif days_waiting < 7:
        stage = 1  # Manager
    else:
        stage = 2  # Partner
    
    # Get recipients for this stage
    recipients = mgr.get_reminder_recipients(client_id, escalation_stage=stage)
    
    print(f"\nDay {days_waiting}: Escalation Stage {stage}")
    print(f"To: {', '.join(recipients['to'])}")
    if recipients['cc']:
        print(f"CC: {', '.join(recipients['cc'])}")
    
    return recipients


# Example: Simulate escalation over time
for day in [0, 3, 7]:
    recipients = send_alert(client_id, day)

# ============================================================================
# CUSTOMIZE REMINDER SETTINGS
# ============================================================================

# Check current settings
settings = mgr.get_client_settings(client_id)
print(f"\n--- Current Settings ---")
for key, value in settings.items():
    print(f"{key}: {value}")

# Customize for faster escalation if needed
mgr.set_client_settings(client_id, {
    "escalate_owner_days": 2,       # Escalate to manager faster
    "escalate_manager_days": 5,     # Escalate to partner faster
    "escalate_partner_days": 10,    # Final reminder window
    "notify_enabled": 1,
    "notify_thresholds": "14,7,3,1" # Remind at 14, 7, 3, and 1 day
})

# ============================================================================
# MANAGE MULTIPLE CLIENTS
# ============================================================================

# Create another client
client2_id = mgr.add_client("Beta Energy", "Energy")
mgr.add_client_user(client2_id, "alice@beta.com", "Alice", "Owner")

# Get all active clients
all_clients = mgr.get_clients()
print(f"\n--- All Clients ({len(all_clients)}) ---")
for client in all_clients:
    print(f"- {client.name} ({client.industry})")

# ============================================================================
# EDIT/UPDATE OPERATIONS
# ============================================================================

# Edit a team member (change role)
mgr.update_client_user(manager_id, role="Owner", name="Jane Doe")
print(f"Updated Jane Doe to Owner role")

# Archive a client (soft delete)
# mgr.db.archive_client(client2_id)
# print(f"Archived client {client2_id}")

# View all users in a client
team_members = mgr.db.client_users(client_id, active_only=True)
print(f"\nTeam members for {mgr.db.get_client(client_id).name}:")
for user in team_members:
    print(f"  - {user.email}: {user.role}")

# ============================================================================
# REAL-WORLD SCENARIO: NOTIFICATION FLOW
# ============================================================================

def handle_cerpac_expiry_alert(position_title, expat_name, expiry_date, days_until_expiry):
    """
    Real-world example: CERPAC expiry alert workflow
    
    Day 0: Send to Owner
    Day 4: Escalate to Manager
    Day 7: Escalate to Partner
    """
    
    client_id = 1  # Assume we're working with Acme Corp
    
    # Determine escalation stage
    if days_until_expiry >= 4:
        stage = 0
        stage_name = "CERPAC Notification (4 months)"
    elif days_until_expiry >= 1:
        stage = 1
        stage_name = "CERPAC Final Notice (1 month)"
    else:
        stage = 2
        stage_name = "CERPAC Expired"
    
    # Get recipients
    recipients = mgr.get_reminder_recipients(client_id, escalation_stage=stage)
    
    # Compose message
    subject = f"{stage_name}: {position_title} - {expat_name}"
    body = f"""
    Position: {position_title}
    Expatriate: {expat_name}
    CERPAC Expiry: {expiry_date}
    Days until expiry: {days_until_expiry}
    
    Action required: {
        'Notify expat and start renewal' if days_until_expiry >= 1 
        else 'Confirm renewal has been filed'
    }
    """
    
    print(f"Alert: {subject}")
    print(f"Recipients: {recipients}")
    
    # In real usage:
    # send_email(recipients["to"], subject, body, cc=recipients["cc"])


# Example usage
handle_cerpac_expiry_alert(
    position_title="ENGINEERING ADVISOR",
    expat_name="GREG DOTY",
    expiry_date="2027-01-15",
    days_until_expiry=60
)

# ============================================================================
# ACCESSING CLIENT DATA FROM DASHBOARD
# ============================================================================

def show_dashboard_summary(client_id):
    """Display a summary dashboard for the client."""
    
    dashboard = mgr.get_client_dashboard(client_id)
    
    print(f"\n╔════════════════════════════════════════╗")
    print(f"║  Dashboard: {dashboard.client_name:28} ║")
    print(f"╠════════════════════════════════════════╣")
    print(f"║  Action Items:        {dashboard.overdue_count:28} ║")
    print(f"║  Upcoming (30 days):  {dashboard.upcoming_events_count:28} ║")
    print(f"║  Team Size:           {len(dashboard.users):28} ║")
    print(f"║  Owner:               {dashboard.owner.email if dashboard.owner else 'None':28} ║")
    print(f"║  Managers:            {len(dashboard.managers):28} ║")
    print(f"║  Partners:            {len(dashboard.partners):28} ║")
    print(f"╚════════════════════════════════════════╝")


show_dashboard_summary(client_id)

# ============================================================================
# COMMON PATTERNS
# ============================================================================

# Pattern 1: Get owner email to send initial notification
owner = dashboard.owner
if owner:
    print(f"\nSending to Owner: {owner.email}")

# Pattern 2: Get all managers for escalation
managers_to_notify = dashboard.managers
print(f"Managers to CC: {[u.email for u in managers_to_notify]}")

# Pattern 3: Check if client has all roles assigned
has_full_team = (
    dashboard.owner is not None and
    len(dashboard.managers) > 0 and
    len(dashboard.partners) > 0
)
print(f"Has complete team: {has_full_team}")

# Pattern 4: Get all active users (excluding inactive)
active_users = mgr.db.client_users(client_id, active_only=True)
print(f"Active team members: {len(active_users)}")

# ============================================================================
# TESTING YOUR SETUP
# ============================================================================

def verify_setup(client_id):
    """Verify the client setup is correct."""
    
    client = mgr.db.get_client(client_id)
    if not client:
        print("❌ Client not found")
        return False
    
    users = mgr.db.client_users(client_id, active_only=True)
    if not users:
        print("❌ No active users")
        return False
    
    settings = mgr.get_client_settings(client_id)
    if not settings.get("notify_enabled"):
        print("⚠️  Notifications disabled for this client")
    
    print(f"✅ Client '{client.name}' is ready")
    print(f"   - {len(users)} active team members")
    print(f"   - Notifications: {'enabled' if settings.get('notify_enabled') else 'disabled'}")
    
    return True


verify_setup(client_id)

# ============================================================================
# NEXT STEPS
# ============================================================================

print("""
Next Steps:
-----------

1. Run the app and go to Data & Settings → Clients tab
2. Create your clients and assign team members
3. Configure reminder settings per client (optional)
4. The notification system will automatically:
   - Track reminders per client
   - Escalate to manager and partner as needed
   - Apply client-specific timelines

For more details, see:
- CLIENT_MANAGEMENT.md (architecture and API reference)
- INTEGRATION_GUIDE_CLIENTS.md (integration steps)
- tests/test_client_management.py (examples and test patterns)
""")
