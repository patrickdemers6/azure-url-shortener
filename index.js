import cosmos from "./cosmos.js";
import bodyParser from "body-parser";
import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

(async () => {
  const db = await cosmos;
  const app = express();
  const router = express.Router({ strict: true });
  const port = process.env.PORT;

  app.use(bodyParser.json());

  app.post("/create", async (req, res) => {
    const id = makeid(6);
    await db.items.create({ id, url: req.body.url });
    res.send({ id });
  });

  router.get("/:id", async (req, res) => {
    const { resource } = await db.item(req.params.id).read();
    if (!resource) {
      res.status(404);
      res.send();
      return;
    }
    console.log(`redirecting to ${resource.url}`);
    res.redirect(resource.url);
  });

  router.get("/", (_, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  app.use(router);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();
