/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// m*n
// var searchMatrix = function(matrix, target) {
//   for (let i = 0; i < matrix.length; i++) {
//     for (let j = matrix[i].length - 1; j >= 0; j--) {
//       if (matrix[i][j] === target) return true
//       else if (target > matrix[i][j]) break
//     }
//   }
//   return false
// }

// m + n
var searchMatrix = function(matrix, target) {
  const n = matrix.length, m = matrix[0].length
  let x = 0, y = m - 1
  while (x < n && y >= 0) {
    if (matrix[x][y] === target) return true
    else if (matrix[x][y] > target) y--
    else x++
  }
  return false
}
