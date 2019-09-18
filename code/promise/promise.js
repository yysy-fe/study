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
    const resolve = (param) => {
      this.state = FULFILLED;
      this.value = param;
      setTimeout(() => {
        this.resolveFnList.forEach(resFn => {
          resFn(this.value);
        });
      }, 0)
    }

    const reject = (param) => {
      this.state = REJECTED;
      this.reason = param;
      setTimeout(() => {
        this.rejectFnList.forEach(rejFn => {
          rejFn(this.reason);
        });
      }, 0)
    }
    fn(resolve, reject);
    return this;
  }

  then (resFn, rejFn) {
    if (typeof resFn !== 'function') {
      resFn = (value) => {
        return value;
      };
    }
    if (typeof rejFn !== 'function') {
      rejFn = (reason) => {
        throw reason;
      }
    }
    let returnPromise = new MyPromise((resolve, reject) => {
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            resolve(resFn(this.value))
          } catch (e) {
            reject(e);
          }
        }, 0)
      } else if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            reject(rejFn(this.reason))
          } catch (e) {
            reject(e);
          }
        }, 0)
      } else {
        this.resolveFnList.push(() => {
          try {
            resolve(resFn(this.value))
          } catch (e) {
            reject(e);
          }
        });
  
        this.rejectFnList.push(() => {
          try {
            reject(rejFn(this.reason))
          } catch (e) {
            reject(e);
          }
        });
      }
    });

    return returnPromise;
  }

  catch (rejFn) {
    return this.then(null, rejFn);
  }
}

let a = new MyPromise((res, rej) => {
    console.log('now');
    res("xxx");
});

a.then().then().then(msg => {
  console.log('then', msg);
})
.catch(e => {
  console.log('catcherror', e)
});

console.log('应该在then前面');
