/**
 * Created by Sandon on 2019-01-31.
 */
function buildSuffixArray (txt) {
  const len = txt.length
  const suffixes = new Array(len)
  const aCode = 'a'.charCodeAt(0)

  // sort based on first 2 characters
  for (let i = 0; i !== len; i++) {
    const nextIndex = i + 1
    suffixes[i] = {
      index: i,
      rank: [
        txt.charCodeAt(i) - aCode,
        nextIndex < len ? txt.charCodeAt(nextIndex) - aCode : -1
      ]
    }
  }
  suffixes.sort(compare)
  // console.log(JSON.stringify(suffixes))

  // sort based on first 4 characters and so on
  const ind = new Array(len) // get the index in suffixes[] from origin index
  for (let k = 4; k < 2 * len; k*=2) {
    // assign rank to suffixes[0]
    let rank = 0
    let prevRank = suffixes[0].rank[0]
    suffixes[0].rank[0] = rank
    ind[suffixes[0].index] = 0

    // assign rank from suffixes[1] to suffixes[len -1]
    for (let i = 1; i < len; i++) {
      if (suffixes[i].rank[0] === prevRank && suffixes[i].rank[1] === suffixes[i - 1].rank[1]) {
        prevRank = suffixes[i].rank[0]
        suffixes[i].rank[0] = rank
      } else {
        prevRank = suffixes[i].rank[0]
        suffixes[i].rank[0] = ++rank
      }
      ind[suffixes[i].index] = i
    }

    // assign next rank from suffixes[0] to suffixes[len -1]
    for (let i = 0; i < len; i++) {
      let nextIndex = suffixes[i].index + Math.floor(k / 2) // origin index
      suffixes[i].rank[1] = nextIndex < len ? suffixes[ind[nextIndex]].rank[0]: -1
    }

    // sort the suffixes according to first k characters
    suffixes.sort(compare)
  }
  // console.log(JSON.stringify(suffixes))

  // build suffix array
  const suffixArray = suffixes.map(suffix => suffix.index)
  // for (let i = 0; i < len; i++) {
  //   suffixArray[i] = suffixes[i].index
  // }
  return suffixArray
}

function compare (a, b) {
  if (a.rank[0] === b.rank[0]) {
    if (a.rank[1] < b.rank[1]) {
      return -1
    } else if (a.rank[1] > b.rank[1]) {
      return 1
    } else {
      return 0
    }
  } else if (a.rank[0] < b.rank[0]) {
    return -1
  } else {
    return 1
  }
}

export function printSuffix (txt) {
  const suffixArr = buildSuffixArray(txt)
  console.log(suffixArr)
  for (let i = 0; i !== suffixArr.length; i++) {
    console.log(txt.slice(suffixArr[i]))
  }
  console.log('--------------------------------')
  for (let i = 0; i !== suffixArr.length - 1; i++) {
    const result = txt.slice(suffixArr[i]) < txt.slice(suffixArr[i + 1])
    if (!result) {
      console.log(txt.slice(suffixArr[i]), txt.slice(suffixArr[i + 1]))
    }
  }
}

// test
// console.log(buildSuffixArray('banana')) // 5, 3, 1, 0, 4, 2

// printSuffix('accaabbbcaaabbccccbbbcbccccbbcaabaaabcbaacbcbaccaaaccbccbcaa')
// printSuffix('accaaaccbccbcaa')
// printSuffix('aab')
