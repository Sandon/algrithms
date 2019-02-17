## Link
https://www.hackerrank.com/challenges/challenging-palindromes/problem

## 思路
先找出所有的公共子串，再考虑子串本身挨着回文子串的情况；  
先找出所有最长的，再根据字符顺序排序；  

For every index in the first string find longest palindrome 
that starts at this index and longest common substring that 
ends at this index. Repeat this logic for the second string. 
Of course you need to reverse one of them in both steps. 
Remember that there can be multiple answers with the same length.

## 资料
* http://adilet.org/blog/palindromic-tree/
* https://stackoverflow.com/questions/9452701/ukkonens-suffix-tree-algorithm-in-plain-english/9513423#9513423
