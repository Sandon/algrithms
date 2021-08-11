/**
 * Maintained by Sandon.
 */
const mod = 1000000007
function substrings(n) {
  const len = n.length
  const f = []
  const g = []

  g[1] = Number(n[0])
  f[1] = Number(n[0])

  for (let i = 2; i <= len; i++) {
    g[i] = (g[i-1]*10 + i* Number(n[i-1]))%mod
    f[i] = (f[i-1] + g[i])%mod
  }

  return f[len] % mod
}

console.log(substrings("16"))
console.log(substrings("123"))
console.log(substrings("972698438521"))
