const isDeep = {
  '[object Map]': true,
  '[object Set]': true,
  '[object Array]': true,
  '[object Object]': true,
  '[object Arguments]': true,
};

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const isShallow = target => {
  const type = typeof target;
  return type !== 'object' && type !== 'function'  
};

const getType = target => {
  return Object.prototype.toString.call(target);
};

const getInit = target => {
  return new target.constructor();
};

const copyReg = target => {
  const { source, flags } = target;
  return new target.constructor(source, flags);
};

const copySymbol = target => {

};

const copyFunction = target => {

};

const cloneOtherType = (target, type) => {
  const Ctor = target.constructor;
  switch(type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag: 
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return copyReg(target);
    case symbolTag: 
      return copySymbol(target);
    case funcTag:
      return copyFunction(target);
    default:
      return new Ctor(target);
  }
};

const clone = (target) => {
  if (isShallow(target)) {
    return target;
  }
  const type = getType(target);
  let cloneNode;
  if (isDeep[type]) {
    cloneNode = getInit(target);
  }
  else {
    cloneNode = cloneOtherType(target, type);
  }
};