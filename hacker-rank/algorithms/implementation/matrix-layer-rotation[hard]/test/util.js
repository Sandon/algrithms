/**
 * Created by Sandon on 2018/12/2.
 */
export function toMatrix (matrixStr) {
  return matrixStr.split('\n').map((row) => {
    return row.replace(/\s*$/, '').split(' ').map(num => parseInt(num, 10))
  })
}

// module.exports.toMatrix = toMatrix