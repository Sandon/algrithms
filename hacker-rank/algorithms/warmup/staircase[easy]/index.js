/**
 * Created by lipeng on 2018/6/18.
 */
// https://www.hackerrank.com/challenges/staircase/problem
function staircase (n) {
  for (let i = 0; i !== n; i++) {
    const lenForSpace = n - i -1
    const lenForShape = n - lenForSpace
    const line = []
    for (let j = 0; j !== lenForSpace; j++) {
      line.push(' ')
    }
    for (let k = 0; k !== lenForShape; k++) {
      line.push('#')
    }
    console.log(line.join(''))
  }
}
staircase(4)
