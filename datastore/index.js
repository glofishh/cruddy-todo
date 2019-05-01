const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////
//create = POST
exports.create = (text, callback) => {
//                        ^ (err, result)
  counter.getNextUniqueId((err, id) => {
    var filePath = path.join(exports.dataDir, `${id}.txt`);
    fs.writeFile(filePath, text, (err) => {
      if(err) { 
        callback(err);
      } else {
        callback(null, { id: id, text: text });
      }
    });
  });
};
  
// (path.join(todos.dataDir, `${todo.id}.txt`))
// `/dataDir/${id}` , text.txt
// fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
//              ^ filepath          ^text of content    ^ function if err
//                                                        if (err) throw err;
// });

// readAll = GET all
exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

// readOne = GET one
//
exports.readOne = (id, callback) => {
  var filePath = path.join(exports.dataDir, `${id}.txt`);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, {id: id, text: data.toString()});
    }
  });
};

// update =  PUT/PATCH
exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};
//delete = DELETE
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
//                          __dirname/uniqueId, 'text'
exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
