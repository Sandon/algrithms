#!/usr/bin/python3

# 解决方案1

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
def insert(currIndex, currNode, ptr, s, tree):
    # global currNode, ptr

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
        return {'currNode': currNode, 'ptr': ptr}

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
        return {'currNode': currNode, 'ptr': ptr}

    # Else
    while True:
        currLength = tree[temp].length

        if (currIndex - currLength >= 1 and s[currIndex] == s[currIndex - currLength - 1]):
            break

        temp = tree[temp].suffixEdge

    tree[currNode].suffixEdge = \
        tree[temp].insertionEdge[ord(s[currIndex]) - ord('a')]


    # return
    return {'currNode': currNode, 'ptr': ptr}

def palindromicTree(s):
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

    # s = "forgeeksskeegfor"
    # r = insert(0, currNode, ptr)
    # print(r)
    for i in range(0, len(s)):
        ret = insert(i, currNode, ptr, s, tree)
        currNode = ret['currNode']
        ptr = ret['ptr']
    return {'tree': tree, 'ptr': ptr}

# 从str1的所有后缀中，最长的属于str2的子串的后缀
def findLongest (str1, str2):
    maxNum = 0
    maxSuffix = ''
    for i in range(len(str2) - 1, -1, -1):
        tmp = i
        for j in range(len(str1) - 1, -1, -1):
            if (tmp == -1 or str2[tmp] != str1[j]):
                break
            else:
                tmp = tmp - 1
        # print(tmp, i)
        suffix = str2[(tmp + 1): (i + 1)]
        suffixLen = len(suffix)
        if (suffixLen > maxNum):
            maxSuffix = suffix
            maxNum = suffixLen

    return maxSuffix

def getStr(node, originStr, roundStr):
    output = ''
    for i in range(node.start, node.end + 1):
        output += originStr[i]
    output = roundStr + output
    output += roundStr[::-1]
    return output

def buildPalindrome(a, b):
    treeObjA = palindromicTree(a)
    treeA = treeObjA['tree']
    lastA = treeObjA['ptr']

    treeObjB = palindromicTree(b)
    treeB = treeObjB['tree']
    lastB = treeObjB['ptr']

    result = {}
    maxLen = 0
    maxStr = ''

    # treeA and bReverseStr
    bReverseStr = b[::-1]
    for i in range(3, lastA + 1):
        # 找到回文
        pal = ''
        for j in range(treeA[i].start, treeA[i].end + 1):
            pal += a[j]
        palLen = len(pal)

        # 找到回文所有的位置
        start = 0
        end = len(a)
        index = a.find(pal, start, end)
        while index != -1:
            before = a[0: index]
            roundStr = findLongest(before, bReverseStr)
            num = len(roundStr)
            if num == 0:
                index = a.find(pal, index + 1, end)
                continue
            totalLen = num * 2 + (treeA[i].end - treeA[i].start + 1)
            # if not (totalLen in result):
            #     result[totalLen] = []
            # result[totalLen].append({'tree': treeA[i], 'roundStr': roundStr})
            resultStr = roundStr + pal + roundStr[::-1]
            # print(resultStr)
            if totalLen > maxLen:
                maxLen = totalLen
                maxStr = resultStr
            elif totalLen == maxLen and resultStr < maxStr:
                maxStr = resultStr

            index = a.find(pal, index + 1, end)


    # treeB and aReverseStr
    aReverseStr = a[::-1]
    for i in range(3, lastB + 1):
        # 找到回文
        pal = ''
        for j in range(treeB[i].start, treeB[i].end + 1):
            pal += b[j]
        palLen = len(pal)

        # 找到回文所有的位置
        start = 0
        end = len(b)
        index = b.find(pal, start, end)
        while index != -1:
            after = b[index + palLen:]
            afterReverse = after[::-1]
            roundStr = findLongest(afterReverse, a)
            num = len(roundStr)
            if num == 0:
                index = b.find(pal, index + 1, end)
                continue
            totalLen = num * 2 + (treeB[i].end - treeB[i].start + 1)
            # if not (totalLen in result):
            #     result[totalLen] = []
            # result[totalLen].append({'tree': treeB[i], 'roundStr': roundStr})
            resultStr = roundStr + pal + roundStr[::-1]
            # print(resultStr)
            if totalLen > maxLen:
                maxLen = totalLen
                maxStr = resultStr
            elif totalLen == maxLen and resultStr < maxStr:
                maxStr = resultStr

            index = b.find(pal, index + 1, end)


    if (maxLen == 0):
        return '-1'
    else:
        return maxStr



# Driver code
if __name__ == "__main__":

    # s = "forgeeksskeegfor"
    # s = 'qquhuwqhdswxxrxuzzfhkplwunfagppcoildagktgdarveusjuqfistulgbglwmfgzrnyxryetwzhlnfewczmnoozlqatugmd'
    # treeObj = palindromicTree(s)
    # tree = treeObj['tree']
    # last = treeObj['ptr']
    # for j in range(3, last + 1):
    #     output = ''
    #     for i in range(tree[j].start, tree[j].end + 1):
    #         output += s[i]
    # # print(buildPalindrome('bac', 'bac'))
    # print(buildPalindrome('abc', 'def'))
    # print(buildPalindrome('jdfh', 'fds'))
    # print(findLongest('ca', 'bac'))

    input = [
        10,
        'ottloictodtdtloloollllyocidyiodttoacoctcdcidcdttyoiilocltacdlydaailaiylcttilld',
        'jevgfsuujwrunvgvgwpfbknkruvwzgxxgksmexqvxbghfffseuugxkwexhzfbpu',
        'qquhuwqhdswxxrxuzzfhkplwunfagppcoildagktgdarveusjuqfistulgbglwmfgzrnyxryetwzhlnfewczmnoozlqatugmd',
        'jwgzcfabbkoxyjxkatjmpprswkdkobdagwdwxsufeesrvncbszcepigpbzuzoootorzfskcwbqorvw',
        'dczatfarqdkelalxzxillkfdvpfpxabqlngdscrentzamztvvcvrtcm',
        'bqlizijdwtuyfrxolsysxlfebpolcmqsppmrfkyunydtmwbexsngxhwvroandfqjamzkpttslildlrkjoyrpxugiceahgiakev',
        'kfnfolpcfblpncetyhtrwxkbosccskxbuvcrosavnpxzoeoyyghbbqkflslfkqbbhgyyjj',
        'qrxpxnloeozxpnvasorcvubxksccsobkxwrthytecnplbfcplofx',
        'mlfcpidlqrvngnvttaifcbopnwezesomkxhaiafmvkbjaisyr',
        'btultpnxbcrmornqumatserhieqggrivouwfnbnghdfall',
        'pb',
        'kkb',
        'rfq',
        'xzj',
        'zlc',
        'zdw',
        's',
        'k',
        'w',
        'd'
    ]

    i = 1
    while i < len(input):
        print(buildPalindrome(input[i], input[i + 1]))
        i += 2
    # print(buildPalindrome(input[3], input[4]))
