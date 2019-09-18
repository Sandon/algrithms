## 示例分析1
```
原数据输入：4,3,1,2
逆序数：0+1+2+2=5
```
maxN = 4
origin: [0, 0, 0, 0，0], bit: []

4：
origin: [0, 0, 0, 0, 1], bit: []
prefixSum: 1
逆序数：1（当前总数） - prefixSum = 0

3:
origin: [0, 0, 0, 1, 1], bit: []
prefixSum: 1
逆序数：2（当前总数） - prefixSum = 1

1:
origin: [0, 1, 0, 1, 1], bit: []
prefixSum: 1
逆序数：3（当前总数） - prefixSum = 2

2:
origin: [0, 1, 1, 1, 1], bit: []
prefixSum: 2
逆序数：4（当前总数） - prefixSum = 2