/**
 * Maintained by Sandon.
 */
function abbreviation(a, b) {
  const aLen = a.length
  const bLen = b.length
  const r = []

  // init
  for (let i = 1; i <= aLen; i++) {
    r[i] = []
    for (let j = 1; j <= bLen; j++) {
      if (i < j) {
        r[i][j] = false
      }
    }
  }

  r[1][1] = (a[0].toUpperCase() === b[0])

  for (let i = 1; i <= aLen; i++) {
    r[i][0] = allLowCase(a.slice(0, i))
  }

  // loop
  for (let i = 2; i <= aLen; i++) {
    for (let j = 1; j <= i; j++) {
      const aLetter = a[i - 1]
      const bLetter = b[j - 1]
      const isUpper = isUpperCase(aLetter)
      if (isUpper) {
        if (aLetter === bLetter) {
          r[i][j] = r[i - 1][j - 1]
        } else {
          r[i][j] = false
        }
      } else {
        const aUpperLetter = aLetter.toUpperCase()
        if (aUpperLetter !== bLetter) {
          r[i][j] = r[i-1][j]
        } else {
          r[i][j] = r[i-1][j-1] || r[i-1][j]
        }
      }
    }
  }

  return r[aLen][bLen] ? 'YES' : 'NO'
}
function isUpperCase (char) {
  return char >= 'A' && char <= 'Z'
}

function allLowCase (str) {
  const len = str.length
  for (let i = 0; i !== len; i++) {
    if (isUpperCase(str[i])) {
      return false
    }
  }

  return true
}

console.log(abbreviation('daBcd', 'ABC'))
