/**
 * Maintained by Sandon.
 */
const BigNumber = require('bignumber.js')
function fibonacciModified(t1, t2, n) {
  // Write your code here
  let tem
  for (let i = 3; i <= n; i++) {
    tem = new BigNumber(t2)
    tem = tem.times(t2).plus(t1)

    t1 = t2
    t2 = tem.toFixed()
  }

  return t2
}

console.log(fibonacciModified(0, 1, 10))
