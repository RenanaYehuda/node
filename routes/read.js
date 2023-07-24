const express = require("express");
const router = express.Router();
const { contentFile, write } = require("../node_tirgul");
const fs = require("fs");

router.get("/", async (req, res) => {
  res.json({ msg: "Read route is displaying data" });
});

router.get("/:filePath([\\w\\W]+)", async (req, res) => {
  try {
    let path = req.params["filePath"];
    let text = await contentFile(path);
    res.json({ msg: text });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});

router.post("/readMultipleFiles", async (req, res) => {
  try {
    let body = req.body.arr;
    let arr = [];
    for (let index = 0; index < body.length; index++) {
      arr[index] = await contentFile(body[index]);
    }
    console.log(arr);
    res.json({ msg: arr });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});

router.post("/write:filePath([\\w\\W]+)", async (req, res) => {
  try {
    let path = req.params["filePath"];
    path = path.slice(3);
    console.log(path);

    if (!fs.existsSync(path)) {
      await write(path, req.body.contant);
      res.json({ msg: "Write to file" });
    } else res.json({ msg: "File exist" });

  } catch (err) {
    res.status(500).json({ msg: "err", err });
  }
});

module.exports = router;
