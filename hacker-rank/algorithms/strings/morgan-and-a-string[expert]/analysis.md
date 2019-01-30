```
'BBCACA'
'BBCADB'

```

这个示例说明为什么当遇到比较并选择一个之后，如果后面字符跟前字符一样，也可以被选走
```
在tie点的后2位以上决出胜负，比较第一个差异点（不同于前字符），要么大于，要么小于
'BBADEFA'
'BBADEFB'

'BBCDEFA'
'BBCDEFB'

就在tie点的后面一位决出胜负
'BBDDEFA'
'BCADEFB'
实际：BBB

'BBA(B)DEFA'
'BCA(B)DEFB'
实际：BBA
```