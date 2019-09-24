const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

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
      callback(err);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  //return the current count and assign it to counter
  //get the correct counter value by invking reaCounter method, then we should have a correct number(count)
  //then we wanna increment on that count number
  //Invoke writeCOunter method with the updated count number as a argument.
  // ps. how to use error first callback method
  readCounter((err, counter) => {
    if (err) {
      callback(err);
    } else {
      counter += 1;
      counter = zeroPaddedNumber(counter);
      writeCounter(counter, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, counter);
        }
      });
    }
  });

};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');

//build a function that to handle read and write counter method at once
