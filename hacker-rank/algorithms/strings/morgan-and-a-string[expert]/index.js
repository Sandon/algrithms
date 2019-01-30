export function morganAndString (a, b) {
  a = a.split('')
  b = b.split('')
  const aLen = a.length
  const bLen = b.length
  let aIndex = 0, bIndex = 0
  let result = []

  while (aIndex < aLen && bIndex < bLen) {
    if (a[aIndex] < b[bIndex]) {
      result.push(a[aIndex++])
    } else if (a[aIndex] > b[bIndex]) {
      result.push(b[bIndex++])
    } else {
      if (findBetter(a, aIndex + 1, b, bIndex + 1)) {
        result.push(a[aIndex++])
        while (aIndex < aLen && a[aIndex] === a[aIndex - 1]) {
          result.push(a[aIndex++])
        }
      } else {
        result.push(b[bIndex++])
        while (bIndex < bLen && b[bIndex] === b[bIndex - 1]) {
          result.push(b[bIndex++])
        }
      }
    }
  }

  if (aIndex === aLen) {
    // b is left
    result = result.concat(b.slice(bIndex))
  } else {
    // a is left
    result = result.concat(a.slice(aIndex))
  }

  return result.join('')
}

// return 1 means a is better, otherwise 0
function findBetter (a, aIndex, b, bIndex) {
  const aLen = a.length
  const bLen = b.length

  while (true) {
    if (aIndex === aLen) {
      return 0
    } else if (bIndex === bLen) {
      return 1
    } else if (a[aIndex] < b[bIndex]) {
      return 1
    } else if (a[aIndex] > b[bIndex]) {
      return 0
    } else {
      aIndex++
      bIndex++
    }
  }
}

// console.log(morganAndString('JACK', 'DANIEL') === 'DAJACKNIEL')
// console.log(morganAndString('ABACABA', 'ABACABA') === 'AABABACABACABA')
// console.log(morganAndString('ABA', 'ABAA') === 'AABAABA')