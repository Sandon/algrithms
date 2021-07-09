/**
 * Maintained by Sandon.
 */
function getWays(n, c) {
  const m = c.length

  // init
  const f = []
  for (let i = 0; i <= n; i++) {
    f[i] = []
  }
  const f0 = []
  for (let j = 1; j <= m; j++) {
    f0[j] = 1
  }
  f[0] = f0


  // loop to construct f
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <=m; j++) {
      const jValue = c[j - 1]

      if (j === 1) {
        f[i][j] = (i % jValue === 0 ? 1 : 0)
      } else {
        let count = 0

        const maxTimes = Math.floor(i / jValue)
        for (let z = 0; z <= maxTimes; z++) {
          count += f[i - z * jValue][j-1]
        }

        f[i][j] = count
      }
    }
  }
  // console.log(f)
  return f[n][m]
}

console.log(getWays(4, [1, 2, 3]))
console.log(getWays(10, [2, 5, 3, 6]))

