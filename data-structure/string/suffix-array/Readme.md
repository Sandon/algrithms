## 资料
* https://www.geeksforgeeks.org/suffix-array-set-1-introduction/
* https://www.geeksforgeeks.org/suffix-array-set-2-a-nlognlogn-algorithm/

## 分析
```
aab

## sort based on first 2
Index  Suffix  Rank  Next Rank
0      aab     0     0
1      ab      0     1
2      b       1     -1

## sort based on first 4
Index  Suffix  Rank  Next Rank
0      aab     0     2
1      ab      1     -1
2      b       2     -1

```
