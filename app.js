"use strict";

const express = require("express");
// callback approach
const fsp = require("fs/promises");
const fs = require("fs");
// other modules you use
// program constants

const app = express();
// if serving front-end files in public/
app.use(express.static("public"));

// if handling different POST formats
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(multer().none());

// app.get/app.post endpoints

/**
 * Returns all json objects through GET endpoint for a given json file.
 * Required params: file - file name for file path
 */
app.get("/all", async (req, res) => {
  let fileName = "data/" + req.query.file + ".json";
  if (fileName == null) {
    res.status(400).send("Error retrieving file name.");
  }

  res.type("json");

  try {
    let result = await fsp.readFile(fileName, "utf8");
    let data = JSON.parse(result);
    res.send(data);
  } catch (err) {
    res.status(500).send("Error retrieving data.");
  }
});

/**
 * Returns a singe product, specified by a product id, through GET endpoint.
 * Required params: product - product id
 */
app.get("/productInfo", async (req, res) => {
  let product = req.query.product;

  res.type = "json";

  if (product == null) {
    res.status(400).send("Error retrieving product name.");
  }

  try {
    let result = await fsp.readFile("data/products.json", "utf8");
    let data = JSON.parse(result);
    data = getItem(data, product);
    res.send(data);
  } catch (err) {
    res.status(500).send("Error retrieving product infor.");
  }
});

/**
 * Returns specific products of a given filter through GET endpoint.
 * Required params: filter - filter keyword
 */
app.get("/filter", async (req, res) => {
  let filter = req.query.filter;

  if (filter == null) {
    res.status(400).send("Error retrieving filters.");
  }

  res.type("json");

  try {
    let result = await fsp.readFile("data/products.json", "utf8");
    let data = JSON.parse(result);
    data = filterItems(data, filter);
    res.send(data);
  } catch (err) {
    res.status(500).send("Error logging feedback.");
  }
});

/**
 * Adds customer feedback to feedback.txt using a POST endpoint
 * Required params: body - contains feedback text
 */
app.post("/feedback", async (req, res) => {
  let message = req.query.body;

  if (message === "") {
    res.send("Empty feedback sent, your response was not recorded.");
    return;
  }

  message = message + "\n";

  fs.appendFile("data/feedback.txt", message, "utf8", (err, result) => {
    if (err) {
      res.status(500).send("Error logging your response.");
    } else {
      res.send("Your review has been recorded, thank you!");
    }
  });
});

/**
 * Adds cart items to cart.json using a POST endpoint
 * Required params: body - contains product id, type - method to add or remove
 */
app.post("/cart", async (req, res) => {
  let id = req.query.body;
  let type = req.query.type;
  if (id == null) {
    res.status(400).send("Error retrieving product name.");
  }
  if (type == null) {
    res.status(400).send("Error retrieving add or remove type.");
  }

  fs.readFile("data/cart.json", "utf8", (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving cart products.");
    } else {
      let info = JSON.parse(result);

      if (type === "add") {
        if (info[id]) {
          info[id] = info[id] + 1;
        } else {
          info[id] = 1;
        }
      }
      if (type === "remove") {
        if (info[id] > 1) {
          info[id] = info[id] - 1;
        } else {
          delete info[id];
        }
      }

      fs.writeFile(
        "data/cart.json",
        JSON.stringify(info, null, 2),
        "utf8",
        (err, result) => {
          if (err) {
            res.status(500).send("Error logging car products.");
          } else {
            res.type("text");
            res.send("Item was added to cart");
          }
        }
      );
    }
  });
});

// helper functions

/**
 * Filters products.json files given a specific filter and returns a filtered json object
 * @param data
 * @param filter
 * @returns json
 */
function filterItems(data, filter) {
  let json = {};
  for (const key in data) {
    let item = data[key];
    if (item.filters.includes(filter)) {
      json[key] = item;
    }
  }
  return json;
}

/**
 * Gets specific product in products.json files given a specific filter and returns a json object
 * @param data
 * @param filter
 * @returns json
 */
function getItem(data, filter) {
  let json = {};
  for (const key in data) {
    let item = data[key];
    if (item.id === filter) {
      json[key] = item;
    }
  }
  return json;
}

const PORT = process.env.PORT || 8000;
app.listen(PORT);
