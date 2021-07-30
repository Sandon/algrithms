/**
 * Maintained by Sandon.
 */
// 解法本质是深度遍历树，获取每个节点的safe和unsafe的数量（使用memoization模式进行记录）
// 定义：这是的safe 是指整棵树safe，unsafe是指只在root节点unsafe（root以下还是safe的）

// 因为是递归，所以本质上这不是最优解，会有很多的call stack，应该从下至上按层遍历是最好的, 所以请参考解法2

const max = Number.MAX_SAFE_INTEGER // Number.MAX_SAFE_INTEGER // 9007199254740992

const BigNumber = require('bignumber.js')
const safe = 0
const unsafe = 1
const M = []
const dp = []
const vis = []
const h = 1000000007

function kingdomDivision(n, roads) {
  for (let i = 0; i !== n; i++) {
    M[i] = []
    dp[i] = [0, 0]
    vis[i] = false
  }

  roads.forEach(pair => {
    pair[0]--
    pair[1]--
    M[pair[0]].push(pair[1])
    M[pair[1]].push(pair[0])
  })
  // console.log('M', M)
  dfs(0)
  console.log(dp)
  return (2 * dp[0][safe]) % h
}
function dfs (x) {
  vis[x] = true
  let sf = new BigNumber(1)
  let usf = new BigNumber(1)

  const len = M[x].length
  for (let i = 0; i !== len; i++) {
    const y = M[x][i]
    if (vis[y]) continue
    dfs(y)

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

// console.log(kingdomDivision(5, [[1, 2], [1, 3], [3, 4], [3, 5]]))
// 590145815
module.exports = kingdomDivision
