#!/bin/bash
set -e
LOGFILE=/var/log/gunicorn/stagediving.log
LOGDIR=$(dirname $LOGFILE)
NUM_WORKERS=6
# user/group to run as
USER=root
GROUP=root
cd  /home/user/stagediving
#source ../bin/activate
test -d $LOGDIR || mkdir -p $LOGDIR
exec gunicorn_django -w $NUM_WORKERS \
    --user=$USER --group=$GROUP --log-level=debug \
    --log-file=$LOGFILE 2>>$LOGFILE

