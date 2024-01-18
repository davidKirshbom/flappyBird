const express = require("express");
const path = require("path");
const app = express();
app.get("/", (req, res) => {
  res.sendFile(path.join("src", "flappyBird.html"), {
    root: __dirname,
  });
});
app.use(express.static(path.join(__dirname, "res")));
app.use(express.static(path.join(__dirname, "src")));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
