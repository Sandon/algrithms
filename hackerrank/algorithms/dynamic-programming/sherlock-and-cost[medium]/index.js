/**
 * Maintained by Sandon.
 */
// 参考分析2
function cost(B) {
  const len = B.length
  let hi = 0,low = 0
  for (let i = 1; i <= len - 1; i++) {
    const nextLow = Math.max(low, hi + Math.abs(B[i-1] - 1))
    const nextHi = Math.max(hi + Math.abs(B[i] - B[i-1]), low + Math.abs(B[i] - 1))
    low = nextLow
    hi = nextHi
  }
  return Math.max(hi, low)
}

// console.log(cost([10, 1, 10, 1, 10]))
console.log(cost([100, 2, 100, 2, 100]))
