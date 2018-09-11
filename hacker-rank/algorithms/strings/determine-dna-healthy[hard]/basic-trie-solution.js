/**
 * Created by lipeng on 2018/9/11.
 */
// https://www.hackerrank.com/challenges/determining-dna-health/problem
function dnaHealthy (genes, health, dnas) {
  var max = Number.NEGATIVE_INFINITY, min = Number.POSITIVE_INFINITY
  // construct trie
  //console.time('init')
  var trie = initTrie(genes, health)
  //console.timeEnd('init')

  // search
  var dnasLen = dnas.length
  for (var i = 0; i !== dnasLen; i++) {
    var dna = dnas[i]
    var dnaStr = dna.d
    var sum = 0

    for (var x = 0; x !== dnaStr.length; x++) {
      var node = trie
      for (var y = x ; y < dnaStr.length; y++) {
        var letter = dnaStr[y]
        if (node.next[letter]) {
          node = node.next[letter]
          sum = addSum(sum, node, dna.first, dna.last)
        } else {
          break
        }
      }
    }

    //console.log(sum)
    max = Math.max(sum, max)
    min = Math.min(sum, min)
  }

  console.log(`${min} ${max}`)
}

function initTrie (genes, health) {
  var trie = {
    next: {},
    indexArr: [],
    accumulatedHealth: []
  }
  var len = genes.length

  // construct a tree
  for (var i = 0; i !== len; i++) {
    var gene = genes[i]

    var tmpTrie = trie
    for (var j = 0; j !== gene.length; j++) {
      var letter = gene[j]
      if (!tmpTrie.next[letter]) {
        tmpTrie.next[letter] = {
          next: {},
          indexArr: [],
          accumulatedHealth: []
        }
      }
      tmpTrie = tmpTrie.next[letter]
    }
    tmpTrie.indexArr.push(i)
    var lenTmp = tmpTrie.accumulatedHealth.length
    tmpTrie.accumulatedHealth.push(lenTmp ? tmpTrie.accumulatedHealth[lenTmp - 1] + health[i] : health[i])
  }

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
