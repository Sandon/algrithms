# coding: utf-8
import random

allLines = 50 * 10000
lineCount = 1
chance = [3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]
allKey = []  # 所有关键字集合
with open("key.txt", 'r', encoding='utf-8') as infile:
    for line in infile:
        allKey.append(line.rstrip())

with open("dataset.txt", 'w', encoding='utf-8') as outfile:
    pass


def generateDataset():
    global allLines, lineCount, allKey
    with open("dataset.txt", 'a', encoding='utf-8') as outfile:
        with open("wordline.txt", 'r', encoding='utf-8') as infile:
            for line in infile:
                if (lineCount > allLines):
                    break
                line = line.strip()  # 去掉\n
                cc = (int)(len(line) / 30) + 1
                for i in range(cc):
                    curLine = line[i * 30: (i + 1) * 30]
                    if len(curLine) < 10:
                        break
                    keywordInsertCount = chance[random.randint(0, len(chance) - 1)]
                    pos = []
                    for j in range(keywordInsertCount):
                        pos.append(random.randint(0, len(curLine)))
                    pos = sorted(set(pos))
                    if (len(pos) < 3):
                        break
                    offset = 0
                    randKeys = []
                    for j in range(len(pos)):
                        randKey = random.choice(allKey)
                        randKeys.append(randKey)
                        curLine = curLine[:pos[j] + offset] + randKey + curLine[pos[j] + offset:]
                        offset += len(randKey)
                    print(str(lineCount) + curLine + "|" + "|".join(randKeys) + "\n")
                    outfile.write(curLine + "|" + "|".join(set(randKeys)) + "\n")
                    lineCount += 1
                    if (lineCount > allLines):
                        break
    return lineCount


while lineCount < allLines:
    generateDataset()
