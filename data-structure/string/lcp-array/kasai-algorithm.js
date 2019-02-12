/**
 * Created by Sandon on 2019-02-11.
 */
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

// console.log(buildLcpKasai([5, 3, 1, 0, 4, 2], 'banana')) // [ 1, 3, 0, 0, 2, 0 ]
