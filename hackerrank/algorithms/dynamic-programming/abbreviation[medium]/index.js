/**
 * Maintained by Sandon.
 */
function abbreviation(a, b) {
  let aIndex = 0, bIndex = 0
  const aLen = a.length, bLen = b.length
  let lastMatchedLowCase = null
  while (true) {
    if (aIndex >= aLen || bIndex >= bLen) break

    // todo
    if (a[aIndex] === b[bIndex] && lastMatchedLowCase && lastMatchedLowCase) {

    }

    if (a[aIndex].toUpperCase() === b[bIndex] ) {
      aIndex++
      bIndex++

      if (!isUpperCase(a[aIndex])) {
        lastMatchedLowCase = a[aIndex]
      } else {
        lastMatchedLowCase = null
      }

    } else if (!isUpperCase(a[aIndex])) {
      aIndex++
    } else {
      break
    }
  }

  return bIndex >= bLen ? 'YES' : 'NO'
}

function isUpperCase (char) {
  return char >= 'A' && char <= 'Z'
}

console.log(abbreviation('daBcd', 'ABC'))
