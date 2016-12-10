docker exec -it $(docker ps | grep serv1 | awk '{ print $1 }') /bin/sh -c 'npm run db:seed'
