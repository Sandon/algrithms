# coding:utf-8
from time import clock

allKeyRegex = []  # 所有关键字集合
nowIndex = 0


def matchKey(str, keyArr):
    for key in keyArr:
        if str.find(key) >= 0:
            return True
    return False


print("索引ing")
print(clock())

with open("dataset.txt", 'r', encoding='utf-8') as infile:
    for line in infile:
        nowIndex += 1
        reline = line[line.index("|") + 1:].strip()
        allKeyRegex.append(reline.split("|"))

print(clock())
nowIndex = 0
with open("answer.txt", 'w', encoding='utf-8') as outfile:
    with open("query.txt", 'r', encoding='utf-8') as infile:
        for line in infile:
            nowIndex += 1
            print("matching:" + str(nowIndex))
            mIndex = []
            for i in range(len(allKeyRegex)):
                match = matchKey(line.strip(), allKeyRegex[i])
                if match:
                    mIndex.append(i + 1)

            if len(mIndex) == 0:
                outfile.write("0\n")
            else:
                outfile.write(",".join(map(str, mIndex)) + "\n")
print(clock())
