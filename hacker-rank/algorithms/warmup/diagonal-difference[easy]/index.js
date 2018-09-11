/**
 * Created by lipeng on 2018/6/18.
 */
// https://www.hackerrank.com/challenges/diagonal-difference/problem
function diagonalDifference (a) {
  const len = a.length
  let primarySum = 0, secondarySum = 0
  for (let i = 0, lastIndex = len - 1; i !== len; i++) {
    primarySum += a[i][i]
    secondarySum += a[i][lastIndex - i]
  }
  return Math.abs(primarySum - secondarySum)
}

console.log(diagonalDifference([
  [11, 2, 4],
  [4, 5, 6],
  [10, 8, -12]
]))
