/**
 * Maintained by Sandon.
 */
// 来自分析3
const mod = 1000000007

function countArray(n, k, x) {
  const f = []
  const g = []
  f[2] = x === 1 ? 0 : 1
  g[2] = x === 1 ? k-1 : k-2

  for (let i = 3; i <= n; i++) {
    f[i] = g[i-1]
    g[i] = (f[i-1] * (k-1) + g[i-1]*(k-2)) % mod
  }

  return f[n]
}
console.log(countArray(4, 3, 2))
