Function.prototype.myBind = function (context, ...args) {
  return (...args2) => {
    this.apply(context, [...args, ...args2]);
  }
}