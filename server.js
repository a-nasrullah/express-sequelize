const http = require("http");

const variables = require("./config/variables");

const db = require("./config/database");
const app = require("./src/app");
const uncaughtRejection = require("./src/middlewares/errors/uncaughtRejection");
const uncaughtException = require("./src/middlewares/errors/uncaughtException");

db.authenticate()
  .then(() => console.log("Database connected successfully."))
  .catch((err) => console.error("Database Error: ", err));

const server = http.createServer(app);

const PORT = variables.app.PORT;

uncaughtException();

server.listen(PORT, () =>
  console.log(`Server is up & running at PORT:${PORT}`)
);

uncaughtRejection(server);
