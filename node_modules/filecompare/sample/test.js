var fc = require('../');

fc('a.txt','b.txt',function(isEqual) {
    if (isEqual) 
        console.log("Equals.");
    else 
        console.log("not equals.");
});
