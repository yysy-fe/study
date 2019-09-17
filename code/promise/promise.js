const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

/**
 * 异步包装函数
 */
const asyncGenerator = fn => {
  return (...args) => {
    setTimeout(() => {
      fn(...args);
    }, 0);
  }
}

class MyPromise {
  constructor(fn) {
    this.state = PENDING;
    this.value = null;
    this.reason = null;
    this.resolveFnList = [];
    this.rejectFnList = [];
    const resolve = (...args) => {
        this.state = FULFILLED;
        this.value = args;
        setTimeout(() => {
        this.resolveFnList.forEach(fn => {
          fn(this.value);
        });
      }, 0)
    }

    const reject = (...args) => {
        this.state = REJECTED;
        this.reason = args;
        setTimeout(() => {
        this.rejectFnList.forEach(fn => {
          fn(this.reason);
        });
      }, 0)
    }
    fn(resolve, reject);
    return this;
  }

  then (resFn, rejFn) {
    if (typeof resFn !== 'function') {
      resFn = () => {
        return this;
      };
    }
    if (typeof rejFn !== 'function') {
      rejFn = () => {
        throw this.reason;
      }
    }
    this.resolveFnList.push(asyncGenerator(resFn));
    this.rejectFnList.push(asyncGenerator(rejFn));
  }

  catch (rejFn) {
    if (this.rejectFnList.length > 0) {
      return;
    }
    if (typeof rejFn !== 'function') {
      rejFn = () => {
        throw this.reason;
      }
    }
    this.rejectFnList.push(asyncGenerator(rejFn));
  }
}

let a = new MyPromise((res, rej) => {
    console.log('now');
    rej("errrrr");
});

console.log(a)

a.then(msg => {
  console.log('res', msg);
}, e=> {console.log('thenerror', e)})
// .catch(e => {
//   console.log('catcherror', e)
// });

console.log('应该在then前面');
