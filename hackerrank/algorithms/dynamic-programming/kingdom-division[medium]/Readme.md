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



Here,
dp[y][safe] is the number of possible subtrees with y as root where at least one of the child nodes has the same colour as y, given the colour of y.
dp[y][unsafe] is the number of possible subtrees with y as root where all the child nodes have colour different than the colour of y, given the colour of y.
In the for loop of the dfs, I calculated all possible subtrees at x where either no node can be attacked or only the root can be attacked, given the colour of x. Then, I subtracted all the unsafe (usf) possibilities to get the total number of safe (sf) possibilities.







No, if you know the colour of x, say blue, then while calculating all possible safe or unsafe trees at x, we need to consider the safe subtrees with root y in red colour (dp[y][safe]), the safe subtrees with root y in blue colour (dp[y][safe]) and the unsafe trees with root y in colour blue, y being one of the children of x.

Note that the third calculation essentially joins unsafe subtrees with root y to the parent x with the same colour as y, to get safe subtrees rooted at x.

Why are we not counting the unsafe trees with root y in colour red, y being one of the children of x?

Because that will result in us getting subtrees which are neither completely safe nor unsafe at only the root, which is the constraint of our DP. Also, such trees would not be subtractable by subtracting the unsafe subtrees at x, to get the total safe subtrees at x, which is our final aim.







I first add the count of all safe and unsafe trees to the variable sf with this line:

sf*=dp[y][safe]+dp[y][safe]+dp[y][unsafe];

Then, I remove the count of all unsafe trees with this line:

sf-=usf,sf+=h,sf%=h;

So, the first line is written this way because given the colour of a root node, I can either:

1.Add a safe subtree with the same colour subtree root as its child to get a tree with a safe root node or,
2.Add a safe subtree with the alternate colour subtree root as its child to get a tree with a (yet) unsafe root node or,
3.Add an unsafe subtree with the same colour subtree root as its child to get a tree with a safe root node.
Finally, I remove the count of unsafe root trees from it.
