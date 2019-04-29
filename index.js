const express = require("express");
const app = express();
const port = 4000;
const monk = require("monk");
const bodyParser = require("body-parser");
const cors = require("cors");

// Connection URL
const url =
  "mongodb://brad:happy1@cluster0-shard-00-00-xyxff.mongodb.net:27017,cluster0-shard-00-01-xyxff.mongodb.net:27017,cluster0-shard-00-02-xyxff.mongodb.net:27017/myfav?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

const db = monk(url);

db.then(() => {
  console.log("Connected correctly to server");
});
const people = db.get("work");

app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const result = await people.find();
  console.log("get called");
  res.status(200).send(result);
});

app.post("/", async (req, res) => {
  const result = await people.insert(req.body);
  console.log("post called");
  res.status(200).send(result);
});

app.put("/:id", async (req, res) => {
  const result = await people.findOneAndUpdate(req.params.id, req.body);
  console.log("put called");
  res.status(200).send(result);
});

app.delete("/:id", async (req, res) => {
  const result = await people.findOneAndDelete(req.params.id);
  console.log("delete called");
  res.status(200).send(result);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
