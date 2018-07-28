function commonSubstring(a, b) {
  const len = a.length
  let result = []
  for (let i = 0; i !== len; i++) {
    const strLen = a[i].length
    let isCommon = false
    for (let j = 0; j !== strLen; j++) {
      if (b[i].indexOf(a[i][j]) !== -1) {
        isCommon = true
        break
      }
    }
    result[i] = isCommon ? 'YES' : 'NO'
  }
  return result
}
// console.log(commonSubstring(['hello', 'hi'], ['world', 'bye']))

function countDuplicates(numbers) {
  const exist = {}
  let num = 0
  numbers.forEach((item) => {
    if (!exist[item]) {
      exist[item] = 1
    } else {
      exist[item] = exist[item] + 1
    }
  })
  for (let item in exist) {
    if (exist[item] > 1) {
      num++
    }
  }
  return num
}
console.log(countDuplicates([1,1,2,2,2,3,4,3,9]))

