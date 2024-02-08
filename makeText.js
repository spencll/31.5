/** Command-line tool to generate Markov text. */

/** Command-line tool to generate Markov text. */

// "imports"
const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

/** Make Markov machine from text and generate text from it. */

// Text -> Markov
function generateText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

/** read file and generate text from it. */

// Process files
function makeText(path) {
  fs.readFile(path, "utf8", function cb(err, data) {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      // Making data into markov and console logging
      generateText(data);
    }
  });
}

/** read URL and make text from it. */

async function makeURLText(url) {
  let resp;

  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  // Making html data into markov and console logging
  generateText(resp.data);
}

/** interpret cmdline to decide what to do. */

// array starting from arguement is destructured to method and path (destination)
let [method, path] = process.argv.slice(2);

// markoving data from file
if (method === "file") {
  makeText(path);
} 
// markoving data from url via request
else if (method === "url") {
  makeURLText(path);
} else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}
