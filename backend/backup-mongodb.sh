export CONTAINER_NAME="boilerplate_db_1"
export DATABASE_NAME="boilerplate"
export BACKUP_LOCATION="/root/DBBackups"
export TIMESTAMP=$(date +'%Y%m%d%H%M%S')
docker exec -t ${CONTAINER_NAME} mongodump --out /data/db/${DATABASE_NAME}-backup-${TIMESTAMP} --db ${DATABASE_NAME}
docker cp ${CONTAINER_NAME}:/data/db/${DATABASE_NAME}-backup-${TIMESTAMP} ${BACKUP_LOCATION}