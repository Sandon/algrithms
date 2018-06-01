/**
 * Created by lipeng on 2018/6/1.
 */
const cache = {0: 0, 1: 1}
function fib (n) {
  if (cache[n] === undefined)
    cache[n] = fib(n - 1) + fib(n - 2)
  return cache[n]
}

console.log(fib(10))