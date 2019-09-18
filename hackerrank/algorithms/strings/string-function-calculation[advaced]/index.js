/**
 * Created by Sandon on 2019-02-11.
 */
// nlogn algorithm for building suffix array
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


// kasai algorithm for building lcp array
function buildLcpKasai (suffixArr, txt) {
  const len = suffixArr.length
  const lcp = new Array(len)
  // An auxiliary array to store inverse of suffix array
  // elements. For example if suffixArr[0] is 5, the
  // invSuff[5] would store 0.
  // In fact invSuff[i], i present index in original text,
  // also present the suffix string,
  // and invSuff[i] present index in suffixArr.
  // You can take invSuff as a map between origin text index(suffix string) and suffixArr index.
  const invSuff = new Array(len)

  // init
  for (let i = 0; i !== len; i++) {
    lcp[i] = 0
    invSuff[suffixArr[i]] = i
  }

  // build lcp
  let nextLcp = 0
  for (let i = 0; i !== len; i++) {
    // i is the index of origin text, so in fact we process
    // all suffix in origin text one by one

    // remember invSuff[i] is index in suffixArr.
    // lcp[len - 1] is zero
    if (invSuff[i] === len - 1) {
      nextLcp = 0
      continue
    }
    const nextSuffixIndex = suffixArr[invSuff[i] + 1] // index in origin text
    while (i + nextLcp < len
    && nextSuffixIndex + nextLcp < len
    && txt[i + nextLcp] === txt[nextSuffixIndex + nextLcp]) {
      nextLcp++
    }
    lcp[invSuff[i]] = nextLcp

    // because lcp of next suffix in text will be at least ${nextLcp - 1}
    nextLcp > 0 && (nextLcp--)
  }

  // return lcp
  return lcp
}

function stringFuctionCalculation (txt) {
  const suffixArr = buildSuffixArray(txt)
  const lcp = buildLcpKasai(suffixArr, txt)
  const len = txt.length
  let result = len
  for (let i = 0; i < len; i++) {
    // because it's common prefix, means at least there are two of the common prefix
    let count = 2

    for (let j = i - 1; j >= 0; j--) {
      if (lcp[j] >= lcp[i]) {
        count++
      } else {
        break
      }
    }

    for (let j = i + 1; j < len; j++) {
      if (lcp[j] >= lcp[i]) {
        count++
      } else {
        break
      }
    }

    result = Math.max(result, count * lcp[i])
  }

  return result
}

export const maxValue = stringFuctionCalculation

// test
// console.log(stringFuctionCalculation('aaaaaa'))
// console.log(stringFuctionCalculation('abcabcddd'))
