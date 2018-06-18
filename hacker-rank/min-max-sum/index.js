/**
 * Created by lipeng on 2018/6/18.
 */
function miniMaxSum (arr) {
  let max = Number.NEGATIVE_INFINITY, min = Number.POSITIVE_INFINITY
  const len = arr.length
  for (let i = 0; i !== len; i++) {
    let sum = 0
    for (let j = 0; j !== len; j++) {
      if (i === j)
        continue
      sum += arr[j]
    }
    max = sum > max ? sum : max
    min = sum < min ? sum : min
  }
  console.log(`${min} ${max}`)
}

miniMaxSum([1, 2, 3, 4, 5])