# 分析

## 分析1 
问题拆解
f(x,y) 是当数组长为x，且数组最后一个值为y时，要计算的总数
3 <= x <= n
1 <= y <= k

f(x, y) = 所有 f(x-1, z) 之和，其中 1 <= z <= k 且 z != y

初始： f(2, z) 当 z==1 时0， 当z!=1时1


最后求f(n, x)的值

## 分析2
如果没有1和x的限制，那么总数是 k*(k-1)^(n-1)
如果只有1的限制 (k-1)*(k-1)^(n-2)
如果只有x的限制 (k-1)*(k-1)^(n-2)

## 分析3
f(i) 是当数组长为i，且数组最后一个值为x时，的总数
g(i) 是当数组长为i，且数组最后一个值不为x时，的总数

f(i) = f(i-2)*(k-1) + g(i-2)*(k-2)
g(i) = f(i-2)*(k-2) + g(i-2)*?

f(i) = g(i-1)
g(i) = f(i-1) * (k-1) + g(i-1)*(k-2)

f(2) = x == 1 ? 0 : 1
g(2) = x == 1 ? k-1 : k-2

最后求f(n)

