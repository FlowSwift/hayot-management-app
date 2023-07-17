# Define variables
POSTGRES_CONTAINER="inventory-database"
USERNAME="postgres"
BACKUP_DIR="db_backup"
BACKUP_FILE="$BACKUP_DIR/backup_$(date +%Y-%m-%d_%H-%M).sql"

# Create the backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Perform the database backup
docker exec -t $POSTGRES_CONTAINER pg_dumpall -U $USERNAME -l products > $BACKUP_FILE

# For auto backups, add <0 1 * * * /path/to/backup_script.sh> using `crontab -e`