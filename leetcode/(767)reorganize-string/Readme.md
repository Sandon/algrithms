#
## 一种思路
本题要使得两两相邻的字符不同，其实我们并不需要考虑很多种情况，我们只需要关注出现次数最多的字符，令其出现次数为 n。则判断该字符串是不是可以重新排布，就看这个 n*2-1 是不是大于 S.size()。

如果是，说明没有办法重新排布，如果不是，我们总有办法进行重新排布。

那重新排布的具体方法是什么呢？其实也很简单，就是先把这个出现次数最多的字符在奇数位隔位安置好，然后把剩下的字符，也按照字母顺序依次隔位放入，奇数位全部放满就继续隔位放偶数位，肯定能保证相邻的字符不同。

```
class Solution {
public:
    string reorganizeString(string S) {
        vector<int> cnt(26);
        int mostFreq = 0, i = 0;
        for(char c : S) {
            if(++cnt[c - 'a'] > cnt[mostFreq]) {
                mostFreq = (c - 'a');
            }
        }
        if(2 * cnt[mostFreq] - 1 > S.size()) return "";
        while(cnt[mostFreq]) {
            S[i] = ('a' + mostFreq);
            i += 2;
            cnt[mostFreq]--;
        }
        for(int j = 0; j < 26; j++) {
            while(cnt[j]) {
                if(i >= S.size()) i = 1;
                S[i] = ('a' + j);
                cnt[j]--;
                i += 2;
            }
        }
        return S;
    }
};
```

## 另一种思路（贪心算法、小根堆、优先队列）
将字母按照出现次数从大到小排序。

每次优先选择剩余次数最多，且与新字符串末尾字符串不重复的字符，排在末尾。

若某次选择无法找出这样的字符，则返回空串。

## 参考
https://zhuanlan.zhihu.com/p/83609800
