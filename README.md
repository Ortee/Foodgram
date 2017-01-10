# Foodgram

##API-DOC:
http://foodgram.tk:8500/

Technology Stack

![alt tag](http://tech.orteedev.pl/stack.jpg)

![alt tag](http://tech.orteedev.pl/diag3.png)

## Install:
```
[Docker](https://www.docker.com/)   
```
```
[Node v6.X](https://nodejs.org/en/)   
```
```
[Npm](https://docs.npmjs.com/getting-started/installing-node)   
```
```
$ git clone https://github.com/Ortee/Foodgram.git Foodgram
$ cd Foodgram
$ cd server
$ npm install
$ cd ..
$ cd nodestore
$ npm install
$ cd ..
$ cd frontend
$ npm install
$ cd ..
```
###### Windows users
Do all the commands above and after that install pg manually.
```
$ cd server
$ npm install pg
```
## Usage
FIRST RUN
```
$ docker-compose up
$ ./setup.sh     <-- fix node-sass problem
Wait few seconds
$ ./seed.sh
Done.
If you have any problems email: kontakt@mateuszoracz.pl
```
###### Windows users
Scripts for windows not included. You need to do it manually.
```
$ docker-compose up

1. Fix sass problem <- on the bottom of readme
2. Seed
  Enter server container
  $ npm run db:seed
```

START
```
$ docker-compose up
```
STOP
```
$ docker-compose down / CTRL+C / CMD+C
```
> SERVER : localhost:3000 <br>
> FRONTEND : localhost:4000
>> When you edit only frontend better use port 4000 because it automatically refreshes browser (files .js & .scss)<br><br>
>> Only port 3000 is working with database and Express

## Migrate & Seed PostgreSql
Run docker containers
```
$ docker-compose up
```
U need server container ID
```
$ docker ps
```
Attach to server container
```
$ docker exec -it [ID] /bin/bash
```
Run migration
```
root@[SERVER_CONTAINER_ID]$ npm run db:migrate
```
Run seeders
```
root@[SERVER_CONTAINER_ID]$ npm run db:seed
```
## Testing server & frontend
Always run tests in server container!

Run server tests
```
root@[SERVER_CONTAINER_ID$ npm run run:server:tests
```
Run frontend tests
```
root@[SERVER_CONTAINER_ID$ npm run build:frontend:tests
root@[SERVER_CONTAINER_ID$ npm run run:frontend:tests
```
## Enter PostgreSql
```
$ docker ps
$ docker exec -it [POSTGRES_CONTAINER_ID] /bin/bash
root@[CONTAINER_ID]$ su - postgres
root@[CONTAINER_ID]$ psql db
```
Show tables
```
root@[CONTAINER_ID]$ \d
```
## Add custom model/seeder/migration
Enter server container
```
$ docker ps
$ docker exec -it [ID] /bin/bash
root@[CONTAINER_ID]$ cd server
```
Run Sequelize task
```
root@[CONTAINER_ID]$ ../node_modules/.bin/sequelize [TASK]
```
EXAMPLE: Create model and migration name: Post with attributes name & content
```
root@[CONTAINER_ID]$  ../node_modules/.bin/sequelize model:create --name Post --attributes name:string,content:text  --underscored
```
Hint: Express don't like camelCase. Use always --underscored param.

```
Available tasks
  db:migrate             Run pending migrations.
  db:migrate:old_schema  Update legacy migration table
  db:migrate:undo        Revert the last migration run.
  db:migrate:undo:all    Revert all migrations ran.
  db:seed                Run specified seeder.
  db:seed:all            Run every seeder.
  db:seed:undo           Deletes data from the database.
  db:seed:undo:all       Deletes data from the database.
  help                   Display this help text. Aliases: h
  init                   Initializes the project. [init:config, init:migrations, init:seeders, init:models]
  init:config            Initializes the configuration.
  init:migrations        Initializes the migrations.
  init:models            Initializes the models.
  init:seeders           Initializes the seeders.
  migration:create       Generates a new migration file. Aliases: migration:generate
  model:create           Generates a model and its migration. Aliases: model:generate
  seed:create            Generates a new seed file. Aliases: seed:generate
  version                Prints the version number. Aliases: v
Available manuals
  help:db:migrate             The documentation for "sequelize db:migrate".
  help:db:migrate:old_schema  The documentation for "sequelize db:migrate:old_schema".
  help:db:migrate:undo        The documentation for "sequelize db:migrate:undo".
  help:db:migrate:undo:all    The documentation for "sequelize db:migrate:undo:all".
  help:db:seed                The documentation for "sequelize db:seed".
  help:db:seed:all            The documentation for "sequelize db:seed:all".
  help:db:seed:undo           The documentation for "sequelize db:seed:undo".
  help:db:seed:undo:all       The documentation for "sequelize db:seed:undo:all".
  help:init                   The documentation for "sequelize init".
  help:init:config            The documentation for "sequelize init:config".
  help:init:migrations        The documentation for "sequelize init:migrations".
  help:init:models            The documentation for "sequelize init:models".
  help:init:seeders           The documentation for "sequelize init:seeders".
  help:migration:create       The documentation for "sequelize migration:create".
  help:model:create           The documentation for "sequelize model:create".
  help:seed:create            The documentation for "sequelize seed:create".
  help:version                The documentation for "sequelize version".
  ```
## Documentation
Documentation created with apiDoc - added to the project by default, available at port 8500.

In case of editing

```
$ cd server
$ npm run apidoc
```
###### Windows users
You need to change server/package.json apidoc script to:
```
"apidoc": "apidoc -e \"(node_modules|public|tmp)\" -i ../nodestore/ -i ./routes/ -o ../apidoc -t ../apidoc/template"
```
Then you can run commands above.
## Fixes
SASS-LOADER FIX

Enter frontend container

```
$ npm rebuild node-sass
```
Restart docker containers
