/**
 * Maintained by Sandon.
 */

// 分析1

const mod = 1000000007
function countArray(n, k, x) {
  const r = []
  for (let i = 2; i <= n; i++) {
    r[i] = []
  }
  for (let i = 1; i <= k; i++) {
    r[2][i] = (i === 1 ? 0 : 1)
  }

  for (let x = 3; x <= n; x++) {
    for (let y = 1; y <= k; y++) {
      let item = 0
      for (let z = 1; z <= k; z++) {
        if (z !== y) {
          item += r[x-1][z]
          item = item % mod
        }
      }
      r[x][y] = item
    }
  }

  return r[n][x]
}

console.log(countArray(4, 3, 2))
