[![Build Status](https://travis-ci.org/rook2pawn/node-filecompare.svg?branch=master)](https://travis-ci.org/rook2pawn/node-filecompare)
[Project Git Url](https://github.com/rook2pawn/node-filecompare/)

# filecompare
    
Asynchronous file compare. Now using native Promises and native BufferTools (alloc and Buffer comparisons)

# install

    npm install --save filecompare

# test

    npm test

# Example

    var fc = require('filecompare');
    var cb = function(isEqual) {
      console.log("equal? :" + isEqual);
    }
    fc(path1,path1,cb);

# command line usage

    npm install -g filecompare

    filecompare a.txt b.txt
  
    
# Features

* perfect for high stress systems
* works with binary data
* perfect for comparing very large files

# Advanced usage

### Specify read size and buffer size.
  
    var fc = require('filecompare');
    var cb = function(isEqual) {
      console.log("equal? :" + isEqual);
    }
    const readSize = 4096;
    const bufferSize = 8192;
    fc(path1,path1,cb,readSize, bufferSize);


# Why is this useful? 

Bytes are read into a small buffer, then compared. 

Each step is independently asynchronous yet only steps forward after confirming
buffers are identical. 

This means if there is an unforseen process spike from some other processes, the file compare will exscuse itself until CPU load becomes more available. This means you can compare arbitrarily sized multi-gigabyte files all the time without worry about locking up the computer.

# LICENSE

MIT 