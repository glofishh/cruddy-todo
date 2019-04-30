const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;
//does this need to be replaced with express?

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////
// continuation passing style notes: 
//take the current code and wrap it up in a closure and do
//that later.



// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};
//First there's a POST request, 2nd: we add one to the counter, we write the 
// post , create  a file with a unique Id, and send it to data, then you can read it back, padded, file path
// Public API - Fix this function //////////////////////////////////////////////
//What is wrong with it?Maybe this is where the continuation passing style happens.
//it needs to return another function with an id so that it will be continuous so that the 
//id's and text will stay stored.

//getNextUniqueId takes a callback
exports.getNextUniqueId = (callback) => {
  readCounter((err, result) => {
    writeCounter(result + 1, (err, uniqueId) => {
    callback(err, uniqueId);
    });
  });
};


// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
