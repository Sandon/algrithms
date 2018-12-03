/**
 * Created by Sandon on 2018/12/2.
 */
// module.exports.matrixRotation = matrixRotation
export default matrixRotation
function matrixRotation (matrix, times, rows, columns) {
  const xEnd = rows - 1
  const yEnd = columns - 1
  const result = new Array(rows)
  for (let x = 0; x !== rows; x++) {
    result[x] = new Array(columns)
    for (let y = 0; y !== columns; y++) {
      const distance = Math.min(x, y, xEnd - x, yEnd - y)
      const origin = mapPositionClock(x, y, distance, distance, rows, columns, times)
      result[x][y] = matrix[origin.x][origin.y]
    }
    console.log(result[x].join(' '))
  }
  return result
}

// clock
function mapPositionClock (x, y, leftTopXIndex, leftTopYIndex, sizeX, sizeY, step) {
  const width = sizeX - leftTopXIndex * 2
  const height = sizeY - leftTopXIndex * 2
  const rightBottomYIndex = leftTopYIndex + height - 1
  const rightBottomXIndex = leftTopXIndex + width - 1
  step = step % ((width + height) * 2 - 4)

  while (step > 0) {
    if (x ===  leftTopXIndex && y !== rightBottomYIndex) {
      // on top line, go right
      const len = rightBottomYIndex - y
      const goLen = Math.min(len, step)
      y = y + goLen
      step = step - goLen
    } else if (y === leftTopYIndex) {
      // on left line, go up
      const len = x - leftTopXIndex
      const goLen = Math.min(len, step)
      x = x - goLen
      step = step - goLen
    } else if (x === rightBottomXIndex) {
      // on bottom line, go left
      const  len = y - leftTopYIndex
      const goLen = Math.min(len, step)
      y = y - goLen
      step = step - goLen
    }
    else {
      // on right line, go down
      const len = rightBottomXIndex - x
      const goLen = Math.min(len, step)
      x = x + goLen
      step = step - goLen
    }
  }
  return {x, y}
}
// console.log(mapPositionClock(2, 1, 1, 1, 6, 7, 2))

// anti-clock
function mapPositionAntiClock (x, y, leftTopXIndex, leftTopYIndex, sizeX, sizeY, step) {
  const width = sizeX - leftTopXIndex * 2
  const height = sizeY - leftTopXIndex * 2
  const rightBottomYIndex = leftTopYIndex + height - 1
  const rightBottomXIndex = leftTopXIndex + width - 1
  step = step % ((width + height) * 2)
  while (step) {
    if (x ===  leftTopXIndex && y !== leftTopYIndex) {
      // on top line, go left
      const  len = y - leftTopYIndex
      const goLen = Math.min(len, step)
      y = y - goLen
      step = step - goLen
    } else if (y === rightBottomYIndex) {
      // on right line, go up
      const len = x - leftTopXIndex
      const goLen = Math.min(len, step)
      x = x - goLen
      step = step - goLen
    } else if (x === rightBottomXIndex) {
      // on bottom line, go right
      const len = rightBottomYIndex - y
      const goLen = Math.min(len, step)
      y = y + goLen
      step = step - goLen
    } else {
      // on left line, go down
      const len = rightBottomXIndex - x
      const goLen = Math.min(len, step)
      x = x + goLen
      step = step - goLen
    }
  }
  return {x, y}
}
// console.log(mapPositionAntiClock(1, 2, 1, 1, 6, 7, 2))
