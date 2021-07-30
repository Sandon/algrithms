/**
 * Maintained by Sandon.
 */
// 构造依赖树，从下到上按层遍历，获取每个节点的safe和unsafe的数量
// 定义：这是的safe 是指整棵树safe，unsafe是指只在root节点unsafe（root以下还是safe的）

// 这种解法也不行，因为构造树的过程，就会需要递归，从而导致call stack溢出 （所以关键点变成了如何不递归地构造树）
// 尝试过递归+循环的方式，但时间很慢
let count = 1
const BigNumber = require('bignumber.js')
const safe = 0
const unsafe = 1
const M = []
const dp = []
const h = 1000000007

class Node {
  constructor (key) {
    this.key = key
    this.finished = false
    this.related = []
    this.upRelated = []
  }
  append (node) {
    this.related.push(node)
    node.upRelated.push(this)
  }
}

function kingdomDivision(n, roads) {
  // init
  for (let i = 0; i !== n; i++) {
    dp[i] = [0, 0]
  }

  // build the map
  roads.forEach((pair, index) => {
    pair[0]--
    pair[1]--

    if (!M[pair[0]]) {
      M[pair[0]] = new Node(pair[0])
    }
    if (!M[pair[1]]) {
      M[pair[1]] = new Node(pair[1])
    }

    if (pair[1] < pair[0]) {
      M[pair[1]].append(M[pair[0]])
    } else {
      M[pair[0]].append(M[pair[1]])
    }
    // M[pair[1]].append(M[pair[0]])
  })

  while (true) {
    console.log('count', count++)
    let allFinished = true
    for (let i = 0; i !== n; i++) {
      if (!M[i].finished) {
        allFinished = false
      }

      checkAndRun(i, 1)
    }

    if (allFinished) {
      break
    }
  }

  // for (let i = n - 1; i >= 0; i--) {
  //   dfs(i)
  // }

  console.log(dp)
  return (2 * dp[0][safe]) % h
}

function dfs (x) {
  let sf = new BigNumber(1)
  let usf = new BigNumber(1)

  const len = M[x].related.length
  for (let i = 0; i !== len; i++) {
    const y = M[x].related[i].key

    usf = usf.times(dp[y][safe]) // usf *= dp[y][safe]
    // if (usf > max) {
    //   console.log('wow1')
    // }
    usf = usf.modulo(h) // usf %= h

    sf = sf.times(dp[y][safe] + dp[y][safe] + dp[y][unsafe]) // sf *= (dp[y][safe] + dp[y][safe] + dp[y][unsafe])
    // if (sf > max) {
    //   console.log('wow2')
    // }
    sf = sf.modulo(h) // sf %= h
  }

  sf = sf.minus(usf) // sf -= usf
  sf = sf.plus(h) // sf += h // case for negative
  sf = sf.modulo(h) // sf %= h

  // console.log(x, ':', sf, usf)
  dp[x][safe] = sf.toNumber()
  dp[x][unsafe] = usf.toNumber()
}

function checkAndRun(i, depth) {
  if (depth > 4000) return // depth limit

  let relatedFinished = true
  M[i].related.forEach(node => {
    if (!node.finished) {
      relatedFinished = false
    }
  })
  if (relatedFinished) {
    dfs(i)
    M[i].finished = true

    // depth limit
    M[i].upRelated.forEach(node => {
      checkAndRun(node.key, depth + 1)
    })
  }
}

console.log(kingdomDivision(5, [[1, 2], [1, 3], [3, 4], [3, 5]]))

module.exports = kingdomDivision
