/**
 * Created by Sandon on 2018/12/3.
 */
import { toMatrix } from './util.js'
import matrixRotation from '../solution2.js'
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
console.log(matrixRotation(testMatrix1, 2, 4, 4).toString() == testMatrix1Rotate2TimesOutput.toString())

