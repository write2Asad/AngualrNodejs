const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:4200'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/api/items", (req, res) => {
  const items = JSON.parse(fs.readFileSync("data.json", "utf8"));
  res.send(items);
});

app.get("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const items = JSON.parse(fs.readFileSync("data.json", "utf8"));
  const item = items.find((item) => item.id === id);
  if (item) {
    res.send(item);
  } else {
    res.status(404).send("Item not found");
  }
});

app.delete("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const items = JSON.parse(fs.readFileSync("data.json", "utf8"));
  const index = items.findIndex((item) => item.id === id);
  if (index !== -1) {
    items.splice(index, 1);
    fs.writeFileSync("data.json", JSON.stringify(items));
  }
  res.send({});
});

app.put("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const items = JSON.parse(fs.readFileSync("data.json", "utf8"));
  const index = items.findIndex((item) => item.id === id);
  if (index !== -1) {
    items[index] = req.body;
    fs.writeFileSync("data.json", JSON.stringify(items));
  }
  res.send({});
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
