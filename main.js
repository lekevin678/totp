const express = require("express");
const app = express();
const path = require("path");
const port = 5000;

function getTotpCode(email, secret, res) {
  const { spawn } = require("child_process");

  const childPython = spawn("python3", ["totp/totp.py", "get", email, secret]);

  childPython.stdout.on("data", (data) => {
    res.send(data);
  });

  childPython.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  childPython.on("close", (data) => {
    console.log(`exit code : ${data}`);
  });
}

const cors = require("cors");
app.use(cors());

app.use(express.static(path.join(__dirname, "/build/")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/build/", "index.html"));
});

app.get("/totp", function (req, res) {
  res.sendFile(path.join(__dirname, "/build/", "index.html"));
});

app.get("/api", function (req, res) {
  console.log(req.query.email);
  console.log(req.query.secret);

  getTotpCode(req.query.email, req.query.secret, res);
});

app.listen(process.env.PORT || 5000);
