/*
https://www.youtube.com/watch?v=iZDbENJrl4I

1. docker container ls ( -a - include stopped containers )
2. docker container run -d --name=pg -p 5431:5432 -e POSTGRES_PASSWORD=secret -e PGDATA=/pgdata -v /home/developer/development/postgres_container/pgdata:/pgdata postgres:11.4 (-p <host machine free port>:<container port>)
===> pgdata folder contains postgres files
3. psql -h localhost -p 5431 -U postgres (password would be 'secret', note the port 5431, not 5432)
4. update config to contain 5431 port
5. npm run db:create ==> create a database inside container
6. nmp run db:migrate ==> create tables inside container
7. docker container stop pg ==> stops postgres
8. docker container start pg ===> starts pg (note that the data still exists)
*/

const express = require("express");
const app = express();
const port = process.env.PORT;

const models = require("./models");
const User = models.User;

app.get("/", (req, res) => {
  res.send("Hello from EXPRESS!");
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();

  res.json({ users });
});

app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`);
});