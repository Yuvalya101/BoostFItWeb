import dotenv from "dotenv";
import connectToDatabase from "./database";
import app from "./app";
import { setupSwagger } from "./swagger";

dotenv.config();

setupSwagger(app);
app.listen(8080, () => {
  console.log("Listening on port 8080");

  // switch to false here in production
  connectToDatabase(true /* Not in test mode */)
    .then(() => {
      console.log("Connected to mongodb");
    })
    .catch((e) => {
      console.log("Failed to connect to mongo db", e);
    });
});
