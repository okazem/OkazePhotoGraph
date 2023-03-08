const express = require("express");
const request = require("request");
const fetch = require("node-fetch");
const app = express();

// Google Drive URL of the image you want to retrieve
const GAS_URL = process.env.GAS_URL;

// Set response headers
app.get("/image.png", (req, res) => {
  console.log("req");
  let FILE_URL = "";
  try {
    fetch(GAS_URL+"?folder="+req.query.folderId)
      .then((response) => response.json())
      .then((data) => {
        res.setHeader("Content-Type", "image/png");
        res.setHeader("Content-Disposition", `inline; filename="image.png"`);
        // Pipe the image data to the response
        request
          .get(`http://drive.google.com/uc?export=view&id=${data.id}`)
          .pipe(res);
      });
  } catch (error) {
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Disposition", `inline; filename="image.png"`);
    console.error(error);
    // Pipe the image data to the response
    request
      .get(
        `https://drive.google.com/file/d/1yXMh_rpONu1RqGuo8iKUWSbUSsGRZbpR/view?usp=sharing`
      )
      .pipe(res);
  }
});
// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
