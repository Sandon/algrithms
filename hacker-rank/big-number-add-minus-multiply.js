/**
 * Created by lipeng on 2018/6/17.
 */

function addition (a, b) {
  // a plus b may produce carry
  a = `0${a}`.split('')
  b = `0${b}`.split('')

  // padding two array with '0' at front in order to make them have same length
  const distance = a.length - b.length
  if (distance > 0) {
    for (let i = 0; i !== distance; i++) {
      b.unshift('0')
    }
  } else if (distance < 0) {
    const guard = Math.abs(distance)
    for (let i = 0; i !== guard; i++) {
      a.unshift('0')
    }
  }

  // do addition
  const result = []
  const len = Math.max(a.length, b.length)
  for (let i = len - 1, carry = 0; i >= 0; i--) {
    let  tmp = +a[i] + (+b[i]) + carry
    if (tmp > 9) {
      carry = 1
      result.unshift(tmp - 10)
    } else {
      carry = 0
      result.unshift(tmp)
    }
  }

  return result.join('').replace(/^0+/, '')
}

console.log(addition(55, 555))
