const fs = require('fs');
const assert = require('assert');
const fsread = require('util').promisify(fs.read);

const fileBufferObject = function(path, bufferSize) {
    var fd = fs.openSync(path,'r');
    var b = Buffer.alloc(bufferSize);
    return {fd:fd,b:b,pos:0,size:fs.statSync(path).size};
}
exports.fileBufferObject = fileBufferObject;

// beautiful construct from https://lowrey.me/while-loop-with-es6-promises/
const promiseWhile = (data, condition, action) => {
  var whilst = (data) => {
    return condition(data) ?
      action(data).then(whilst) :
      Promise.resolve(data);
  }
  return whilst(data);
};

var doCompare = function(f1, f2, cb, step, bufferSize) {

  assert(step <= bufferSize);

  if (f1.size !== f2.size) {
    return cb(false);
  }
  var isDone = false;

  const condition = function(data) {
    let f1 = data.f1; let f2 = data.f2;
    let isEqual = f1.b.equals(f2.b);
    let isEnd = (f1.pos === f1.size) || (f2.pos === f2.size);
    if (isEqual && isEnd) {
      isDone = true;
      return false
    }
    return ((f1.b).equals(f2.b))
  };

  const action = function(data) {

    let f1 = data.f1; let f2 = data.f2;
    let p1 = fsread(f1.fd, f1.b, 0, step, f1.pos);
    let p2 = fsread(f2.fd, f2.b, 0, step, f2.pos);
    let p3 = Promise.all([p1,p2]).then((obj) => {

      f1.pos += obj[0].bytesRead;
      f2.pos += obj[1].bytesRead;
      return { f1 : data.f1, f2 : data.f2 }
    });
    return p3;
  }

  let p1 = fsread(f1.fd, f1.b, 0, step, f1.pos);
  let p2 = fsread(f2.fd, f2.b, 0, step, f2.pos);
  let p3 = Promise.all([p1,p2])
  p3.then((obj) => {

    f1.pos += obj[0].bytesRead;
    f2.pos += obj[1].bytesRead;
    if ((f1.pos == f1.size) || (f2.pos == f2.size)) {

      if (f1.b.equals(f2.b)) {
        return Promise.resolve({ f1, f2 });
      } else {
        return Promise.reject("Not equal");
      }
    }
    return Promise.resolve({ f1, f2 })
  }).then((data) => {
    return promiseWhile(data, condition, action).then((obj) => {

      fs.closeSync(f1.fd);
      fs.closeSync(f2.fd);
      return cb(isDone);
    })
  }, (reason) => {

    fs.closeSync(f1.fd);
    fs.closeSync(f2.fd);
    return cb(false);
  });
};

exports.compare = doCompare;
