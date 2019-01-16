/**
 * Created by lipeng on 2019/1/14.
 */
function multiply (a, b) {
  a = `${a}`.split('') // .reverse()
  b = `${b}`.split('') // .reverse()

  // 初始化
  const len = a.length + b.length
  const result = new Array(len)
  for (let i = 0; i !== len; i++) {
    result[i] = 0
  }

  // 计算
  for (let i = 0; i !== a.length; i++) {
    for (let j = 0; j !== b.length; j++) {
      result[i + j + 1] +=  a[i] * b[j]
    }
  }

  // 处理进位
  for (let i = result.length - 1; i >= 0; i--) {
    if (result[i] > 9) {
      result[i - 1] += Math.floor(result[i] / 10)
      result[i] %= 10
    }
  }

  return result.join('').replace(/^0+/, '')
}

console.log(multiply(123, 123) == 15129)
console.log(multiply(98765, 1234) == 121876010)
