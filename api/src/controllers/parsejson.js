"use strict";

const path = require("path");

const fs = require("fs");

let rawdata = fs.readFileSync(path.join(__dirname, "../controllers/recipes.json"));

let adidasinfo = JSON.parse(rawdata);
let recipes = adidasinfo.results;


module.exports = recipes;
