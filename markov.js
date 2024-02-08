/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    // list of words
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chain = new Map();

    // TODO
    //1. Iterates through word
    for (let i = 0; i < this.words.length; i += 1) {
      // pulling each word
      let word = this.words[i];
      // pulling next word or nothing
      let next = this.words[i + 1] || null;
      // key exists already, then add next to values of key. Else, create new key/value
      if (chain.has(word)) chain.get(word).push(next);
      else chain.set(word, [next]);
    }
    // stores to chain property
    this.chain = chain;
  }

  /** return random text from chains */

  //takes array and picks random element in array
  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // Array of keys
    let keys = Array.from(this.chain.keys());
    //Pick random key
    let key = MarkovMachine.choice(keys);
    // Storage
    let out = [];

    // produce markov chain until reaching null
    while (out.length < numWords && key !== null) {
      // Making chain
      out.push(key);
      //picks random key, gets value, then makes that as new key
      key = MarkovMachine.choice(this.chain.get(key));
    }

    return out.join(" ");
  }
}


module.exports = {
  MarkovMachine
};