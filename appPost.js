"use strict";

const express = require('express');
const app = module.exports = express();
const path = require("path");
const fs = require("fs");
/** this project needs to parse POST bodies **/
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: false
}));

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (request, file, callback) => callback(null, "temp/uploads/"),
  filename: (request, file, callback) => callback(null, `${file.fieldname}-${Date.now()}`)
});
const upload = multer({
  storage: storage
});

app.post("/api/fileanalyse", upload.single("upfile"), (request, response) => {
  //console.log("The request object: ", request);
  fs.rename(request.file.path, `${request.file.originalname}`, (error) => {
    if (error) throw error;
    response.json({
      name: request.file.originalname,
      type: request.file.mimetype,
      size: request.file.size
    });
    response.end();
    console.log("File uploaded and moved!");
  });
});
