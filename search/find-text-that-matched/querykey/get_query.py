# coding: utf-8

import random

queryMax = 100
lineCount = 1

allKey = []  # 所有关键字集合
with open("key.txt", 'r', encoding='utf-8') as infile:
    for line in infile:
        allKey.append(line.rstrip())

allQueryWordLine = []
with open("wordline.txt", 'r', encoding='utf-8') as infile:
    for line in infile:
        if len(line) > 70:
            allQueryWordLine.append(line.rstrip())

with open("query.txt", 'w', encoding='utf-8') as outfile:
    for i in range(queryMax):
        curLine = random.choice(allQueryWordLine)[:70]  # 取前70个字符+6个关键字，基本上可以query长度为100
        keywordInsertCount = 6  # 插入6个关键字
        pos = []
        for j in range(keywordInsertCount):
            pos.append(random.randint(0, len(curLine)))
        pos = sorted(set(pos))  # 随机6个插入位置
        offset = 0
        randKeys = []
        for j in range(len(pos)):
            randKey = random.choice(allKey)  # 从关键字列表中随机选一个key
            randKeys.append(randKey)
            curLine = curLine[:pos[j] + offset] + randKey + curLine[pos[j] + offset:]  # 插入关键字
            offset += len(randKey)
        outfile.write(curLine + "\n")
        lineCount += 1
        if (lineCount > queryMax):
            break
