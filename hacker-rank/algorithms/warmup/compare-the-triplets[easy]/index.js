/**
 * Created by lipeng on 2018/6/17.
 */
// https://www.hackerrank.com/challenges/compare-the-triplets/problem
function solve (a, b) {
  let aScore = 0, bScore = 0
  a.forEach((value, index) => {
    if (value > b[index]) {
      aScore++
    } else if (value < b[index]) {
      bScore++
    }
  })
  return [aScore, bScore]
}

