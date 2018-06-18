/**
 * Created by lipeng on 2018/6/18.
 */
// https://www.hackerrank.com/challenges/plus-minus/problem
function plusMinus (arr) {
  let positive = 0, negative = 0, zero = 0
  arr.forEach((value) => {
    if (value > 0) {
      positive++
    } else if (value < 0) {
      negative++
    } else {
      zero++
    }
  })
  const total = arr.length
  console.log((positive / total).toFixed(6))
  console.log((negative / total).toFixed(6))
  console.log((zero / total).toFixed(6))
}

plusMinus([-4, 3, -9, 0, 4, 1])
