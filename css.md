### 不同分辨率加载不同图片
```
backgrount: url('1x.png');  
background:-webkit-image-set(  
  url('1x.png') 1x,  
  url('2x.png') 2x,  
  url('3x.png') 3x  
);  
```

### visiblity:hidden 和 display:none 区别
* visiblity:hidden 的子元素设置成 visible 后，子元素可见；display：none 子元素必隐藏
* visiblity:hidden 元素占页面空间，显隐操作只触发重绘； display：none元素不占空间，显隐操作触发重排、重绘

### counter计数器
* counter-reset：重置计数器作用域、初始值(默认为0)  
>counter-reset: count1 0 count2 0 orderxxx 3
* counter-increment: 定义计数器每次增加的值
>counter-increment: count1 5;
* counter：在content属性中使用
>content: counter(item)
