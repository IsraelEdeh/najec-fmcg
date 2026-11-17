# Integration Guide: Activity Logging Implementation

## Quick Start

The porting is complete and all components are functional. To enable full activity logging throughout the application, follow this guide.

## 1. Activity Logging Integration Points

Add activity logging to record user changes. Here are the key places to add logging calls:

### When Creating Records
```python
# In EQPage.add() or similar
dialog = EQDialog(new_rec, quotas, svc.today, svc.lifespan_years, self)
if dialog.exec() == QDialog.Accepted:
    new_rec = dialog.result_record()
    svc.db.save_eq(new_rec)
    
    # Log the creation
    svc.db.log_activity(
        action='Created',
        item_type='eq_position',
        item_id=str(new_rec.id),
        field='',
        detail=f'EQ position: {new_rec.title}',
        by_user=os.getenv('USERNAME', 'System')
    )
    self.data_changed.emit()
```

### When Modifying Records
```python
# In EQPage.edit() or similar
old_rec = selected_eq.rec
dialog = EQDialog(old_rec, quotas, svc.today, svc.lifespan_years, self)
if dialog.exec() == QDialog.Accepted:
    new_rec = dialog.result_record()
    svc.db.save_eq(new_rec)
    
    # Log each changed field
    for field in ['title', 'fmi_approval', 'expat', 'cerpac_expiry', 'quota_id', 'notes']:
        old_val = str(getattr(old_rec, field))
        new_val = str(getattr(new_rec, field))
        if old_val != new_val:
            svc.db.log_activity(
                action='Modified',
                item_type='eq_position',
                item_id=str(new_rec.id),
                field=field,
                old_value=old_val,
                new_value=new_val,
                detail=f'Field updated: {field}',
                by_user=os.getenv('USERNAME', 'System')
            )
    self.data_changed.emit()
```

### When Deleting Records
```python
# In EQPage.delete() or similar
for rec_id in selected_ids:
    rec = svc.db.eq_positions()[rec_id]  # Get full record first
    svc.db.delete_eq([rec_id])
    
    # Log deletion
    svc.db.log_activity(
        action='Deleted',
        item_type='eq_position',
        item_id=str(rec_id),
        detail=f'EQ position deleted: {rec.title}',
        by_user=os.getenv('USERNAME', 'System')
    )
    self.data_changed.emit()
```

### When Importing Data
```python
# In DataPage.import_excel() 
try:
    quotas, positions = import_workbook(path, ...)
    svc.db.replace_all(quotas, positions)
    
    # Log import action
    svc.db.log_activity(
        action='Imported',
        item_type='',
        detail=f'Imported {len(quotas)} quotas and {len(positions)} EQ positions from {Path(path).name}',
        by_user=os.getenv('USERNAME', 'System')
    )
    self.data_changed.emit()
except ImportFailed as exc:
    # Log failed import
    svc.db.log_activity(
        action='Import failed',
        detail=str(exc),
        by_user=os.getenv('USERNAME', 'System')
    )
```

## 2. Using the Activity History Page

The Activity History page is now available in the main navigation (6th option).

### Features
- **Search**: Type to search by position ID, field name, old/new values, or details
- **Filter by Type**: Choose "All changes", "EQ & CERPAC", or "EEPNL quotas"
- **Entry Count**: Shows total matching entries (latest 2000 limit)
- **Columns**: When, By, Action, Type, Item, Field, Old value, New value, Detail

### Example Queries
- Search for a position: Enter "EQ-001" to find all changes to that position
- Find all deletions: Select "Action" and look for "Deleted" entries
- Track field changes: Search for a field name like "expat_approval"

## 3. Database Notes

### Schema
- New `activity_log` table tracks all changes
- Indexed on `item_type` and `item_id` for fast lookups
- Timestamps stored in ISO format (YYYY-MM-DDTHH:MM:SS.ffffff)

### API
```python
# Log an activity
db.log_activity(
    action='Created',           # Action type
    item_type='quota',          # Record type (quota, eq_position, or custom)
    item_id='Q-123',            # Unique identifier
    field='title',              # Field changed (optional)
    old_value='Old Title',      # Previous value (optional)
    new_value='New Title',      # New value (optional)
    detail='Details here',      # Context/description (optional)
    by_user='john.doe'          # Who made the change (optional)
)

# Retrieve activity logs
logs = db.activity_logs(
    search='EQ-001',            # Search term (searches ID, field, values, detail)
    item_type='eq_position',    # Filter by type, '' for all
    limit=2000                  # Max results
)

for log in logs:
    print(log['at'], log['action'], log['item_id'], log['field'])
```

## 4. Enhancement Ideas

The infrastructure is now ready for future features:

1. **Undo/Restore**: Use old_value/new_value to restore previous state
2. **Change Timeline**: Group activities by day or user
3. **Batch Operations**: Group related changes under parent action
4. **Export**: Export activity logs to Excel for auditing
5. **Filters**: Add more sophisticated filtering (date range, user, etc.)
6. **Notifications**: Alert when specific items change
7. **Comparisons**: Side-by-side diff view of changes

## 5. Testing

To verify logging works:

```python
# In Python REPL
from immigration_tracker.db import Database
db = Database()

# Create a test log entry
db.log_activity(
    action='Test',
    item_type='quota',
    item_id='TEST-001',
    field='title',
    old_value='Old',
    new_value='New',
    detail='This is a test',
    by_user='tester'
)

# Retrieve and verify
logs = db.activity_logs(search='TEST-001')
print(f"Created {len(logs)} log entry")
for log in logs:
    print(f"  {log['at']} | {log['action']} | {log['field']} | {log['old_value']} → {log['new_value']}")
```

## 6. Known Limitations & Future Work

Current implementation:
- Activity logs are append-only (for data integrity)
- Search is simple text matching (not fuzzy)
- Max 2000 entries returned per query
- No built-in export/archive mechanism

These can be added later if needed as the system grows.

## Files to Modify for Full Integration

1. **app/immigration_tracker/ui/pages.py**
   - Add logging calls to `EQPage.add()`, `.edit()`, `.delete()`
   - Add logging calls to `QuotaPage.add()`, `.edit()`, `.delete()`
   - Add logging to `DataPage.import_excel()`, `.export_excel()`, `.restore_backup()`

2. **app/immigration_tracker/ui/main_window.py**
   - Add logging for theme changes in `_toggle_theme()` (optional)

## Questions?

Refer to the PORTING_SUMMARY.md for technical implementation details and architecture.
