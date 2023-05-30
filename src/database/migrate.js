const db = require("../../config/database");

require("../models");

const args = process.argv;

if (!!args[2] && (args[2] === "--force" || args[2] === "-f")) {
  db.sync({ force: true })
    .then(() => console.log("Database synced successfully."))
    .catch((err) => {
      console.error("Database Error: ", err);
      process.exit(1);
    });
} else {
  db.sync({ alter: true })
    .then(() => console.log("Database synced successfully."))
    .catch((err) => {
      console.error("Database Error: ", err);
      process.exit(1);
    });
}

process.exit(0);
