/*
 * Copyright © 2018-20 LiquidPlayer
 *
 * Released under the MIT license.
 * See https://github.com/LiquidPlayer/LiquidCore/LICENSE.md for terms.
 */

 /* Hello, World! */
 const {LiquidCore} = require('liquidcore')

// A micro service will exit when it has nothing left to do.  So to
// avoid a premature exit, set an indefinite timer.  When we
// exit() later, the timer will get invalidated.
setInterval(()=>{}, 1000)

console.log('Hello, World!')

// Listen for a request from the host for the 'ping' event
LiquidCore.on( 'ping', (data) => {
    // When we get the ping from the host, respond with "Hello, World!"
    // and then exit.
//    console.log("from local," +data.hallo)
//    LiquidCore.emit( 'pong', { message: 'Hello, World from LiquidCore!' } )
//    process.exit(0)
})

LiquidCore.on( 'pingPair', (data) => {
    console.log("pair," +data.pair)

})
LiquidCore.on( 'pingConnect', (data) => {
    console.log("connect," + data.connect)
})
LiquidCore.on( 'pingVolPlus', (data) => {
   console.log("volPlus," + data.volPlus)
})

LiquidCore.on( 'pingVolMinus', (data) => {
   console.log("volMinus," + data.volMinus)
})
LiquidCore.on( 'pingMenu', (data) => {
   console.log("menu," + data.menu)
})
LiquidCore.on( 'pingHome', (data) => {
   console.log("home," + data.home)
})
// Ok, we are all set up.  Let the host know we are ready to talk
LiquidCore.emit( 'ready' )
