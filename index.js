'use strict';

const co = require('co');

let time = (()=>{
  let t = process.hrtime();

  return ()=>{
    let tt = process.hrtime(t);
    return `${tt[0]}.${Math.floor(tt[1]/1000000)}`;
  };
})();

let async = (label, timeToComplete, resolvesWith)=>{
  return new Promise((r, x)=>{
    setTimeout(()=>{
      console.log('%s %s done', time(), label);
      r(resolvesWith)
    }, timeToComplete)
  });
}

function*  test(){
  console.log('starting')
  let a = async('a', 1000);
  let b = async('b', 3000);
  let c = async('c', 500);
  let dd = async('dd', 7000);
  let d = async('d', 6000, dd);

  yield [a,b];
  console.log('%s yield a & b both done', time());

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

