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
