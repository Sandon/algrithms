/**
 * Created by lipeng on 2018/7/28.
 */
function formingMagicSquare (s) {
  const allMagicSquares = [
    [[8,1,6], [3,5,7], [4,9,2]],
    [[6,1,8], [7,5,3], [2,9,4]],
    [[4,9,2], [3,5,7], [8,1,6]],
    [[2,9,4], [7,5,3], [6,1,8]],
    [[8,3,4], [1,5,9], [6,7,2]],
    [[4,3,8], [9,5,1], [2,7,6]],
    [[6,7,2], [1,5,9], [8,3,4]],
    [[2,7,6], [9,5,1], [4,3,8]],
  ]

  let miniCost = Number.POSITIVE_INFINITY
  allMagicSquares.forEach((square, index) => {
    let cost = 0
    for (let i = 0; i !== 3; i++) {
      for (let j = 0; j !== 3; j++) {
        const sItem = s[i][j]
        const squareItem = square[i][j]
        const minus = sItem - squareItem
        cost += minus < 0 ? -minus : minus
      }
    }
    miniCost = miniCost < cost ? miniCost : cost
  })

  return miniCost
}

console.log(formingMagicSquare([[4, 9, 2], [3, 5, 7], [8, 1, 5]]))
console.log(formingMagicSquare([[4, 8, 2], [4, 5, 7], [6, 1, 6]]))
