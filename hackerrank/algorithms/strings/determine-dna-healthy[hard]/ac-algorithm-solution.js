/**
 * Created by lipeng on 2018/9/10.
 */
// https://www.hackerrank.com/challenges/determining-dna-health/problem
function dnaHealthy (genes, health, dnas) {
  var max = Number.NEGATIVE_INFINITY, min = Number.POSITIVE_INFINITY
  // construct trie
  console.time('init')
  var trie = initTrie(genes, health)
  console.timeEnd('init')

  // search
  var dnasLen = dnas.length
  //dnas.forEach((dna) => {
  for (var i = 0; i !== dnasLen; i++) {
    var dna = dnas[i]
    var dnaStr = dna.d
    var sum = 0

    // ac algorithm
    var len = dnaStr.length
    var found = {}, foundArr = []
    var index = 0
    var nodeTmp = trie
    while (index < len) {
      var letter = dnaStr[index]
      while (nodeTmp && !nodeTmp.next[letter]) {
        nodeTmp = nodeTmp.suffixLink
      }
      if (!nodeTmp) {
        nodeTmp = trie
      } else {
        // output
        var tmp = nodeTmp.next[letter]
        if (tmp.inDictionary) {
          //foundArr.push(tmp.word)
          sum = addSum(sum, tmp, dna.first, dna.last)
        }

        while (tmp.dictSuffixLink) {
          //foundArr.push(tmp.dictSuffixLink.word)
          sum = addSum(sum, tmp.dictSuffixLink, dna.first, dna.last)
          tmp = tmp.dictSuffixLink
        }

        // for next
        nodeTmp = nodeTmp.next[letter]
      }
      index++
    }

    //console.log(sum)
    max = sum > max ? sum : max
    min = sum < min ? sum : min
  }

  console.log(`${min} ${max}`)
}

function initTrie (genes, health) {
  /*
  const targetTrie = {
    // type node
    inDictionary: false,
    pre: {
      // type node
    },
    suffixLink: {
      // type node
    },
    dictSuffixLink: {
      // type node
    },
    letter: '',
    word: '',
    next: {
      a: {
        // type node
      },
      b: {
        // type node
      }
    },
    indexArr: [],
    accumulatedHealth: []
  }
  */
  var trie = {
    inDictionary: false,
    pre: null,
    next: {},
    letter: '',
    word: '',
    indexArr: [],
    accumulatedHealth: []
  }
  var len = genes.length

  // 1. construct a tree
  console.time('construct')
  for (var i = 0; i !== len; i++) {
    var gene = genes[i]

    var tmpTrie = trie
    for (var j = 0; j !== gene.length; j++) {
      var letter = gene[j]
      if (!tmpTrie.next[letter]) {
        tmpTrie.next[letter] = {
          inDictionary: false,
          pre: tmpTrie,
          letter,
          word: tmpTrie.word + letter,
          next: {},
          indexArr: [],
          accumulatedHealth: []
        }
      }
      tmpTrie = tmpTrie.next[letter]
    }
    tmpTrie.inDictionary = true
    tmpTrie.indexArr.push(i)
    var lenTmp = tmpTrie.accumulatedHealth.length
    tmpTrie.accumulatedHealth.push(lenTmp ? tmpTrie.accumulatedHealth[lenTmp - 1] + health[i] : health[i])
  }
  console.timeEnd('construct')

  // 2. build suffix link and dict suffix link by loop the tree level by level
  console.time('suffix')
  var arr = Object.keys(trie.next).map((key) => {
    return trie.next[key]
  })
  while (arr.length) {
    var node = arr.shift()
    Object.keys(node.next).forEach((key) => {
      arr.push(node.next[key])
    })

    var tmp = node.pre
    if (tmp.pre === null) { // father is root, mean node in level 1
      node.suffixLink = tmp
    } else { // node in level bellow level  1
      // suffix link
      do {
        tmp = tmp.suffixLink
        for (var key in tmp.next) {
          if (key == node.letter) {
            node.suffixLink = tmp.next[key]
            break
          }
        }
      } while (tmp.suffixLink && !node.suffixLink)
      node.suffixLink = node.suffixLink || tmp

      // dict suffix link
      var suffixLinkPre = node.suffixLink
      while (suffixLinkPre) {
        if (suffixLinkPre.inDictionary) {
          node.dictSuffixLink = suffixLinkPre
          break
        }
        suffixLinkPre = suffixLinkPre.suffixLink
      }
    }
  }
  console.timeEnd('suffix')

  return trie
}

function addSum (iniSum, node, first, last) {
  var firstIndex = binarySearch(node.indexArr, 0, node.indexArr.length, first - 1)
  var lastIndex = binarySearch(node.indexArr, 0, node.indexArr.length, last)
  var sum = iniSum
  firstIndex !== null && (sum -= node.accumulatedHealth[firstIndex])
  lastIndex !== null && (sum += node.accumulatedHealth[lastIndex])

  return sum
}

// find the biggest one that is less than or equal to ${val} in range [start, end)
function binarySearch (arr, start, end, val) {
  if (end - start <= 1) {
    if (arr[start] <= val) return start
    return null
  }

  var middle = Math.floor((end - start) / 2) + start
  if (arr[middle] == val) {
    return middle
  } else if (arr[middle] < val) {
    return binarySearch(arr, middle, end, val)
  } else {
    return binarySearch(arr, start, middle, val)
  }
}



/*** test area ***/

/*const genes = ['a', 'b', 'c', 'aa', 'd', 'b']
const health = [1, 2, 3, 4, 5, 6]
const dnas = [
  {
    first: 1,
    last: 5,
    d: 'b'
  },
  {
    first: 1,
    last: 5,
    d: 'caaab'
  },
  {
    first: 0,
    last: 4,
    d: 'xyz'
  },
  {
    first: 2,
    last: 4,
    d: 'bcdybc'
  }
]
dnaHealthy(genes, health, dnas)*/

/*const {genes} = require('./test-case2/genes')
const {health} = require('./test-case2/health')
let {dnas} = require('./test-case2/dnas')
console.time('test2')
dnaHealthy(genes, health, dnas)
console.timeEnd('test2')
console.log('here')*/

// 302595.867ms
/*construct: 131.035ms
suffix: 193.998ms
init: 329.020ms
0 0
test2: 375.273ms*/
const {genes} = require('./test-case7/genes')
const {health} = require('./test-case7/health')
let {dnas} = require('./test-case7/dnas')
console.time('test2')
dnaHealthy(genes, health, dnas)
console.timeEnd('test2')
console.log('here')
