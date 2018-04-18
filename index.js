'use strict';

const co = require('co');

function*  test(){
  console.log('starting')
  let a = new Promise((r,j)=>{
    setTimeout(()=>{
      console.log('a done');
      r('woot')
    }, 1000);
  });

  let b = new Promise((r, j)=>{
    setTimeout(()=>{
      console.log('b done')
      r('ya')
    }, 5000)
  });

  let c = new Promise((r,j)=> {
    setTimeout(()=> {
      console.log('c done')
      r('c done')
    }, 1000);
  });

  yield [a,b];
  console.log('yield a-b done')
  //
  yield b;
  console.log('yield b done');

  yield c;
  console.log('yield c done');

  yield Promise.resolve('all done');
}

let d = co(test).then(dd=>{
  console.log('we done')
});


