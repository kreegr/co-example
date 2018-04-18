'use strict';

const co = require('co');

let time = (()=>{
  let t = process.hrtime();

  return ()=>{
    let tt = process.hrtime(t);
    return `${tt[0]}:${Math.floor(tt[1]/1000000)}`;
  };
})();

function*  test(){
  console.log('starting')
  let a = new Promise((r,j)=>{
    setTimeout(()=>{
      console.log('%s a done', time());
      r('woot')
    }, 1000);
  });

  let b = new Promise((r, j)=>{
    setTimeout(()=>{
      console.log('%s b done', time())
      r('ya')
    }, 5000)
  });

  let c = new Promise((r,j)=> {
    setTimeout(()=> {
      console.log('%s c done', time())
      r('c done')
    }, 1000);
  });

  yield [a,b];
  console.log('%s yield a-b done', time())

  yield b;
  console.log('%s yield b done', time());

  yield c;
  console.log('%s yield c done', time());
}

let d = co(test);

d.then(()=>{
  console.log('%s all done', time());
});

