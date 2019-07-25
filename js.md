### js浮点数计算问题
0.1 + 0.2 为什么不等于 0.3  
浮点数转二进制：  
0.1 => 0.0001 1001 1001 1001…（无限循环）  
0.2 => 0.0011 0011 0011 0011…（无限循环）  
由于不同的IEEE标准，会对小数部分进行截取，截取后相加再转成10进制自然有差异。  
解法： Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON

### 在函数内部undefined可被赋值， 所以判断undefined需严谨
包装方法 isUndefined: p => return p === void(0)


### 2.toString() 为什么会报错Uncaught SyntaxError  
js在词法分析阶段 会把“2.”当做一个token 类型是number， 所以在语法分析阶段等价于 -> 2. toString() 不符合语法规范
所以2.toString() 需要改成 2 .toString() 这样才会分析称[2, ., toString, (, )]
