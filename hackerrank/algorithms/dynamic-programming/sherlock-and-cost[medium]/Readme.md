# 分析

## 分析1
数组b

假设适用于贪婪算法

按数组前n个来拆分

f(i) 为前i个元素时，最大的cost

i>=1
f(i+1) = f(i) + max(|(1~A[i]) - b[i-1]|)

第1个元素的选取很重要，直接决定了后续元素选什么；
当前一个数的大小是后一个数中间值时，那么就需要分两种情况了，要么选1，要么选最大；
比较适合树形结构

不成立，不能用贪婪算法

## 分析2
(1) optimal solution must consist of either 1 or Bi for each position. proof left to reader. you can go through the various cases to see that if we have a solution consist of a point that's not 1 or Bi, then we can better that solution using 1 or Bi instead of that point 1<=x<=Bi.

(2) define three functions:

L(i) = max cost using first i items of array B, ending with 1 at i th position. {note: 1 is low so we use L to denote low}
H(i) = max cost for first i items of array B, ending in Bi at i th position. {note: Bi is higher of 1 or Bi thus use H to denote that}
F(i) = max cost for first i items regardless of ending.
L(i) = max (L(i-1),H(i-1)+|B(i-1) - 1|)
H(i) = max (H(i-1)+|B(i)-B(i-1)|,L(i-1)+|B(i) - 1|)
F(i) = max(L(i),H(i))
This take advantage of the fact that, the optimal solution for either L(i) or H(i) must be based on the optimal solution for L(i-1) and H(i-1).

We see this must be true, since if L(i) or H(i) doesn't contain a prefix that's optimal i.e. doesn't contain either L(i-1) or H(i-1) prefixes, then we can better this solution by replacing it using L(i-1) or H(i-1) prefixes.

Using the above we can compute the answer simply using code like this:

```
B = array index starts at 0

func get_max_cost(B):
	N = B.length
	hi,low=0,0
	for i as 1..N-1: # note we skip index 0
		high_to_low_diff = abs(B[i-1] - 1)
		low_to_high_diff = abs(B[i] - 1)
		high_to_high_diff = abs(B[i] - B[i-1])
		
		low_next = max(low, hi+high_to_low_diff)
		hi_next = max(hi+high_to_high_diff, low+low_to_high_diff)
		
		low = low_next
		hi = hi_next
	
	return max (hi,low)
```

这个分析里的索引是有问题的，或者说L(i)代表的是前 i+1个项（ N-1>=i>=1）
