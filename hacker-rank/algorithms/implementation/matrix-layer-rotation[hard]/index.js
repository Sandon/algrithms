/**
 * Created by lipeng on 2018/7/28.
 */
function matrixRotation(matrix, times, rows, columns) {
  let matrixToBeRotated = matrix
  for (let i = 0; i !== times; i++) {
    // init tmpMatrix
    let tmpMatrix = new Array(rows)
    for (let j = 0; j !== rows; j++) {
      tmpMatrix[j] = new Array(columns)
    }

    // rotate
    if (rows <= columns) { // columns is bigger
      const rowBorder = rows / 2
      for (let rowIndex = 0; rowIndex !== rows; rowIndex++) {
        for (let columnIndex = 0; columnIndex !== columns; columnIndex++) {
          if (rowIndex < rowBorder) { // top half area
            // go left or down or up
            if (columnIndex <= rowIndex) {
              // go down
              tmpMatrix[rowIndex + 1][columnIndex] = matrixToBeRotated[rowIndex][columnIndex]
            } else if ( columnIndex <= rows - rowIndex - 1) {
              // go left
              tmpMatrix[rowIndex][columnIndex - 1] = matrixToBeRotated[rowIndex][columnIndex]
            } else {
              // go up
              tmpMatrix[rowIndex - 1][columnIndex] = matrixToBeRotated[rowIndex][columnIndex]
            }
          } else { // bottom half area
            // go right or down or up
            const rowToBottomGap = rows - 1 - rowIndex
            if (columnIndex < rowToBottomGap) {
              // go down
              tmpMatrix[rowIndex + 1][columnIndex] = matrixToBeRotated[rowIndex][columnIndex]
            } else if (columnIndex < columns - 1 - rowToBottomGap) {
              // go right
              tmpMatrix[rowIndex][columnIndex + 1] = matrixToBeRotated[rowIndex][columnIndex]
            } else {
              // go up
              tmpMatrix[rowIndex - 1][columnIndex] = matrixToBeRotated[rowIndex][columnIndex]
            }

          }
        }
      }
    } else {
      const columnBorder = columns / 2
      for (let rowIndex = 0; rowIndex !== rows; rowIndex++) {
        for (let columnIndex = 0; columnIndex !== columns; columnIndex++) {
          if (columnIndex < columnBorder) { // left half area
            const columnToLeftGap = columnIndex
            if (rowIndex < columnIndex) {
              // go left
              tmpMatrix[rowIndex][columnIndex - 1] = matrixToBeRotated[rowIndex][columnIndex]
            } else if (rowIndex < rows - 1 - columnToLeftGap) {
              // go down
              tmpMatrix[rowIndex + 1][columnIndex] = matrixToBeRotated[rowIndex][columnIndex]
            } else {
              // go right
              tmpMatrix[rowIndex][columnIndex + 1] = matrixToBeRotated[rowIndex][columnIndex]
            }
          } else { // right half area
            // go up or left or right
            const columnToRightGap = columns - 1 - columnIndex
            if (rowIndex <= columnToRightGap) {
              // go left
              tmpMatrix[rowIndex][columnIndex - 1] = matrixToBeRotated[rowIndex][columnIndex]
            } else if (rowIndex <= rows - 1 - columnToRightGap) {
              // go up
              tmpMatrix[rowIndex - 1][columnIndex] = matrixToBeRotated[rowIndex][columnIndex]
            } else {
              // go right
              tmpMatrix[rowIndex][columnIndex + 1] = matrixToBeRotated[rowIndex][columnIndex]
            }
          }
        }
      }
    }
    matrixToBeRotated = tmpMatrix
  }

  // print
  matrixToBeRotated.forEach((row) => {
    console.log(row.join(' '))
  })

  return matrixToBeRotated
}


// test 1
const testMatrix1 = [
  [1, 2, 3, 4],
  [12, 1, 2, 5],
  [11, 4, 3, 6],
  [10, 9, 8, 7]
]
const testMatrix1Rotate2TimesOutput = [
  [3, 4, 5, 6],
  [2, 3, 4, 7],
  [1, 2, 1, 8],
  [12, 11, 10, 9]
]
// console.log(matrixRotation(testMatrix1, 2, 4, 4).toString() == testMatrix1Rotate2TimesOutput.toString())

// test2
const  testMatrix2 = [
  [1, 2, 3, 4],
  [7, 8, 9, 10],
  [13, 14, 15, 16],
  [19, 20, 21, 22],
  [25, 26, 27, 28]
]
const testMatrix2Rotate7TimesOutput = [
  [28, 27, 26, 25],
  [22, 9, 15, 19],
  [16, 8, 21, 13],
  [10, 14, 20, 7],
  [4, 3, 2, 1]
]
// console.log(matrixRotation(testMatrix2, 7, 5, 4).toString() == testMatrix2Rotate7TimesOutput.toString())

// test3
const matrixStr3 =
`9718805 60013003 5103628 85388216 21884498 38021292 73470430 31785927
69999937 71783860 10329789 96382322 71055337 30247265 96087879 93754371
79943507 75398396 38446081 34699742 1408833 51189 17741775 53195748
79354991 26629304 86523163 67042516 54688734 54630910 6967117 90198864
84146680 27762534 6331115 5932542 29446517 15654690 92837327 91644840
58623600 69622764 2218936 58592832 49558405 17112485 38615864 32720798
49469904 5270000 32589026 56425665 23544383 90502426 63729346 35319547
20888810 97945481 85669747 88915819 96642353 42430633 47265349 89653362
55349226 10844931 25289229 90786953 22590518 54702481 71197978 50410021
9392211 31297360 27353496 56239301 7071172 61983443 86544343 43779176`
function toMatrix (matrixStr) {
  return matrixStr.split('\n').map((row) => {
    return row.replace(/\s*$/, '').split(' ').map(num => parseInt(num, 10))
  })
}
const matrix3Rotate40TimesOutput =
`93754371 53195748 90198864 91644840 32720798 35319547 89653362 50410021
31785927 25289229 10844931 97945481 5270000 69622764 27762534 43779176
73470430 90786953 42430633 96642353 88915819 85669747 26629304 86544343
38021292 22590518 90502426 67042516 54688734 32589026 75398396 61983443
21884498 54702481 17112485 5932542 29446517 2218936 71783860 7071172
85388216 71197978 15654690 58592832 49558405 6331115 10329789 56239301
5103628 47265349 54630910 56425665 23544383 86523163 96382322 27353496
60013003 63729346 51189 1408833 34699742 38446081 71055337 31297360
9718805 38615864 92837327 6967117 17741775 96087879 30247265 9392211
69999937 79943507 79354991 84146680 58623600 49469904 20888810 55349226`
console.log(matrixRotation(toMatrix(matrixStr3), 40, 10, 8).toString() == toMatrix(matrix3Rotate40TimesOutput).toString())
