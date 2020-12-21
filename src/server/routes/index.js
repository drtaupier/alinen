const express = require("express");
const app = express();

app.use(require("./usuario"));
app.use(require("./login"));
app.use(require("./voluntaria"));
app.use(require("./dias"));
app.use(require("./upload"));

module.exports = app;
