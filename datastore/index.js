const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId( (err, id) => {
    if (err) {
      callback(err);
    } else {
      // items[id] = text;
      // var filepath = exports.dataDir(newID, text);
      // "./dirData/" + newID + ".txt"
      fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err) => {
        if (err) {
          callback(err);
        } else {
          // exports.dataDir(newID, text)
          callback(null, { id, text });
        }
      });
    }
  });
};

exports.readAll = (callback) => {
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);
  // fs.reaadFile(_.map(`${exports.dataDir}`, )
  fs.readdir(`${exports.dataDir}`, (err, fileList) => {
    if (err) {
      callback(err);
    } else {
      // create variable to contains the output of the map function
      //pass in fileList as the list. an the function at the second parameter will be the function that conver t the fileList into the corret form on the npm test
      //the function at the second parameter: 1. slice out the index out of the each name at fileList, create an object whose template is {id: , text: }
      var fileArray = _.map(fileList, function(element) {
        var id = element.slice(0, element.length - 4);
        return {'id': id, 'text': id};
      });
      callback(null, fileArray);
    }
  });
};

exports.readOne = (id, callback) => {
  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
  fs.readFile(`${exports.dataDir}/${id}.txt`, 'utf8', (err, text) =>{
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, {'id': id, 'text': text});
    }
  });
};

exports.update = (id, text, callback) => {
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
  fs.readFile(`${exports.dataDir}/${id}.txt`, 'utf8', (err, oldText) => {
    console.log(oldText);
    if (!oldText) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, {'id': id, 'text': text});
        }
      });
    }
  });


  // fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err) => {
  //   if (err) {
  //     callback(new Error(`No item with id: ${id}`));
  //   } else {
  //     callback(null, {'id': id, 'text': text});
  //   }
  // });
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
