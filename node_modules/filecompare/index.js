const lib = require('./lib');

const compare = function (path1,path2,cb,step,bufferSize) {

  step = step || 8192;
  bufferSize = bufferSize || 8192;

  var f1 = lib.fileBufferObject(path1,bufferSize);
  var f2 = lib.fileBufferObject(path2,bufferSize);
  return lib.compare(f1,f2,cb,step,bufferSize);
};

exports = module.exports = compare;
