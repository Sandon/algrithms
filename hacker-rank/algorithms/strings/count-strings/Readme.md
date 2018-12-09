基本概念：

确定有限自动机(Deterministic Finite Automaton) 简称DFA。dfa是匹配速度，是确定的。

非确定有限自动机(Nondeterministic Finite Automaton) 简称NFA,nfa是匹配结果，是不确定的。

区别：

DFA比较快，但不提供Backtrack（回溯）功能，NFA比较慢，但提供了Backtrack功能。

NFA是基于表达式的（Regex-Directed），而DFA是基于文本的（Text-Directed）。

DFA引擎在任意时刻必定处于某个确定的状态，而NFA引擎可能处于一组状态之中的任何一个，所以，NFA引擎必须记录所有的可能路径（trace multiple possible routes through the NFA），NFA之所以能够提供Backtrack的功能，原因就在这里。


## 参考
https://stackoverflow.com/questions/32663398/algorithm-for-regular-expressions-combinations-on-or
