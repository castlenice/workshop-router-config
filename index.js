import "dotenv/config.js";
import express from "express";
import cors from "cors";
import users from "./routes/users.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); //jeder kann jetzt auf API zugreifen, aufpassen!
app.use(express.json());
app.use("/users", users);

app.get("/", (req, res) => {
  res.send("Hello Mars!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
