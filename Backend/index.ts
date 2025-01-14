import dotenv from "dotenv";
import database from "./database";
import app from "./app";

dotenv.config();


app.listen(8080, () => {
  console.log("Listening on port 8080");

  database
    .then(() => {
      console.log("Connected to mongodb");
    })
    .catch((e) => {
      console.log("Failed to connect to mongo db", e);
    });
});
