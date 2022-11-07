import cosmos from "./cosmos.js";
import bodyParser from "body-parser";
import express from "express";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const run = async () => {
  const db = await cosmos;
  const app = express();
  app.use(bodyParser.json());
  const port = 8080;
  app.post("/create", async (req, res) => {
    console.log(req.body.url);
    const id = makeid(6);
    await db.items.create({ id, url: req.body.url });
    res.send({ id });
  });
  app.get("/:id", async (req, res) => {
    const { resource } = await db.item(req.params.id).read();
    console.log(`redirecting to ${resource.url}`);
    res.redirect(resource.url);
  });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};
run();
