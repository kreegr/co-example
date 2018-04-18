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
  let a = new Promise((r, x)=>{
    setTimeout(()=>{
      console.log('%s a done', time());
      r()
    }, 1000);
  });

  let b = new Promise((r, x)=>{
    setTimeout(()=>{
      console.log('%s b done', time());
      r()
    }, 5000)
  });

  let c = new Promise((r, x)=> {
    setTimeout(()=> {
      console.log('%s c done', time());
      r()
    }, 1000);
  });

  let nestedD1 = new Promise((r, x)=>{
    setTimeout(()=>{
      console.log('%s d1 done', time());
      r();
    }, 7000);
  });

  let d = new Promise((r, x)=>{
    setTimeout(()=>{
      console.log('%s d done', time());
      r(nestedD1);
    }, 6000);
  });

  yield [a,b];
  console.log('%s yield a-b done', time());

  yield b;
  console.log('%s yield b done', time());

  yield c;
  console.log('%s yield c done', time());

  yield d;
  console.log('%s yield d done', time());
}

let d = co(test);


d.then(()=>{
  console.log('%s all done', time());
});

