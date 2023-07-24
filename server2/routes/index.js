const express = require("express");
const router = express.Router();
require("dotenv").config();
const { createArrayfiles, contentFile } = require("../../node_tirgul");
const { doApiMethod } = require("../api");
const path = require("path");
const _ = require("lodash");
const fs = require("fs");
const URL = "http://localhost:3000/read/write/";

router.get("/readAndSave", async (req, res) => {
  let url = "http://localhost:3000/read/write/";
  try {
    let files = createArrayfiles(process.env.PATH_DIRECTORY);
    if (files.length > 0) {
      files.forEach(async (file) => {
        let filename = path.parse(file).base;
        console.log(filename);
        let data = await contentFile(file);
        let newUrl = url + process.env.PATH_DIRECTORY_WRITE + "\\" + filename;
        await doApiMethod(newUrl, "POST", { contant: data });
      });
      res.json({ msg: "all files write " });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});


//Function that check if file exsist
const isExsist = (_nameFile, _filesSecond) => {
  if (/\d$/.test(_nameFile)) {
    console.log(_nameFile);
    _nameFile = _nameFile.slice(0, -1);
  }
  return !_filesSecond.includes(_nameFile);
};


//Function that check end of file
const checkEndFile = (_file) => {
  if (/\d$/.test(_file)) {
    let num = 0;
    num = Number(_file.at(-1));
    if (num + 1 <= process.env.MAX_NUM_SEND) {
      let newFile = _file.replace(/.$/, num + 1);
      fs.rename(_file, newFile, () => {
        console.log("\nFile Renamed!\n");
      });
    } else console.log("can't send anymore");
  } else {
    let num = 0;
    let newFile = _file.concat(num + 1);
    fs.rename(_file, newFile, () => {
      console.log("\nFile Renamed!\n");
    });
  }
}

router.get("/readAndSaveAllTime", async (req, res) => {
  let filename = "";
  try {
    setInterval(function () {
      let files = createArrayfiles(process.env.PATH_DIRECTORY);
      let filesSecond = createArrayfiles(process.env.PATH_DIRECTORY_WRITE);
      let difference = files.filter((x) => isExsist(x, filesSecond));
      if (difference.length > 0) {
        difference.forEach(async (file) => {
          let data = await contentFile(process.env.PATH_DIRECTORY + "/" + file);
          if (/\d$/.test(file)) {
            filename = file.slice(0, -1);
          } else filename = file;
          let newUrl = URL + process.env.PATH_DIRECTORY_WRITE + "\\" + filename;
          try {
            console.log("try");
            await doApiMethod(newUrl, "POST", { contant: data });
            console.log("succses");
          } catch {
            console.log("catch");
            checkEndFile(file)
          }
          files = createArrayfiles(process.env.PATH_DIRECTORY);
          filesSecond = createArrayfiles(process.env.PATH_DIRECTORY_WRITE);
          difference = files.filter((x) => isExsist(x, filesSecond));
        });
      } else console.log("no difference files");
    }, 30000);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});

module.exports = router;
