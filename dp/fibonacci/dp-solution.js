/**
 * Created by lipeng on 2018/6/1.
 */
function fib (n) {
  let result = [0, 1]
  for (let i = 2; i<= n; i++) {
    result[i] = result[i - 1] + result[i - 2]
  }
  return result[n]
}

console.log(fib(10))