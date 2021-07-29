# 分析

## 
参考： https://www.hackerrank.com/challenges/kingdom-division/forum/comments/482925

1、
blue
blue [safe]
至少1个blue

2、
blue
red [safe]
至少1个red

3、
blue
blue [unsafe]
都是red

4、
blue
red [unsafe]
都是blue

这是的safe 是指整棵树safe，unsafe是指只在root节点unsafe（root以下还是safe的）
