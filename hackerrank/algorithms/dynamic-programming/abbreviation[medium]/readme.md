# 分析

## 分析1
AbfBBC
AbfBC

ABBC

或者

abcABCD
ABCD

用字符串匹配的话，解决不了上面的情况

## 分析2
f(i, j) 表示 a的前i个字符组成的字符串， b的前j个字符组成的字符串，是否满足(true/false)
i,j >= 1, 且i>=j
因为i<j时，必然是false

1、a[i-1]为大写，且=b[j-1]时， 
    f(i,j) = f(i-1, j-1)
2、a[i-1]为大写，且!=b[j-1]时，
    f(i,j) = false
3、a[i-1]为小写，且对应大写!=b[j-1]时
    f(i,j) = f(i-1, j)
3、a[i-1]为小写，且对应大写=b[j-1]时
    分两种情况，是/否把它转成大写
    f(i,j) = f(i-1, j-1) || f(i-1, j)
    
初始
f(1, 1) = a[0]的upperCase == b[0] ? true : false
f(1, >1) = false
f(i, >i) = false
