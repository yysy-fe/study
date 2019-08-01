## 用对语义化标签，增加视障人群读屏软件的可读性

## img标签优化
* img是替换型标签
* 建议同时设置宽高，以免资源加载成功后，宽高发生变化会发生重排
* 建议加上合理的alt属性，可以友好的展示在视障人群的读屏软件中

## HTML -> DOM树
HTML文本 -> 词法分析器 -> 语法分析器 -> DOM树

### 词法分析：状态机
>HTML的词法分析相对来说规则比较简单而且官方文档那个规定状态 参考<a href="https://html.spec.whatwg.org/multipage/parsing.html#tokenization" target="_blank">HTML官方文档tokenization</a>

词(token)的定义   

|示例|解释|
|:--:|:--:|
|<xxx|xxx标签的开始|
|a1="xxx"|属性|
|/>|xxx标签的结束|
|\</xxx>|结束标签|
|text|文本节点|
|\<!-- desc -->|注释|
|\<![CDATA[text]]>|CDATA节点，本次不考虑|

