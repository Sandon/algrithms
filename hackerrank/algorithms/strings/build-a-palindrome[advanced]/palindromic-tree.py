#!/usr/bin/python3

# 仅仅构建回文树

class Node:
    def __init__(self, length=None,
                 suffixEdge=None):
        # store start and end indexes
        # of current Node inclusively
        self.start = None
        self.end = None

        # Stores length of substring
        self.length = length

        # stores insertion Node for all
        # characters a-z
        self.insertionEdge = [0] * 26

        # stores the Maximum Palindromic
        # Suffix Node for the current Node
        self.suffixEdge = suffixEdge




# Function to insert edge in tree
def insert(currIndex):
    global currNode, ptr

    # Finding X, such that s[currIndex]
    # + X + s[currIndex] is palindrome.
    temp = currNode

    while True:
        currLength = tree[temp].length
        if currIndex - currLength >= 1 and (s[currIndex] == s[currIndex - currLength - 1]):
            break
        temp = tree[temp].suffixEdge

    # Check if s[currIndex] + X +
    # s[currIndex] is already Present in tree.
    if tree[temp].insertionEdge[ord(s[currIndex]) - ord("a")] != 0:
        currNode = tree[temp].insertionEdge[ord(s[currIndex]) - ord("a")]
        return

    # Else Create new node
    ptr += 1

    tree[temp].insertionEdge[ord(s[currIndex]) - ord("a")] = ptr

    tree[ptr].end = currIndex

    tree[ptr].length = tree[temp].length + 2

    tree[ptr].start = (tree[ptr].end - tree[ptr].length + 1)

    # Setting suffix edge for newly Created Node.

    currNode = ptr
    temp = tree[temp].suffixEdge

    # Longest Palindromic suffix for a
    # string of length 1 is a Null string.
    if tree[currNode].length == 1:
        tree[currNode].suffixEdge = 2
        return

    # Else
    while True:
        currLength = tree[temp].length

        if (currIndex - currLength >= 1 and s[currIndex] == s[currIndex - currLength - 1]):
            break

        temp = tree[temp].suffixEdge

    tree[currNode].suffixEdge = \
        tree[temp].insertionEdge[ord(s[currIndex]) - ord('a')]

# Driver code
if __name__ == "__main__":

    MAXN = 1000

    # Imaginary root’s suffix edge points to
    # itself, since for an imaginary string
    # of length = -1 has an imaginary suffix
    # string. Imaginary root.
    root1 = Node(-1, 1)

    # NULL root’s suffix edge points to
    # Imaginary root, since for a string of
    # length = 0 has an imaginary suffix string.
    root2 = Node(0, 1)

    # Stores Node information for
    # constant time access
    tree = [Node() for i in range(MAXN)]

    # Keeps track the Current Node
    # while insertion
    currNode, ptr = 1, 2

    tree[1] = root1
    tree[2] = root2

    s = "forgeeksskeegfor"
    for i in range(0, len(s)):
        insert(i)

    # last will be the index of our
    # last substring
    last = ptr
    output = ''
    for i in range(tree[last].start, tree[last].end + 1):
        output += s[i]
    print(output)
