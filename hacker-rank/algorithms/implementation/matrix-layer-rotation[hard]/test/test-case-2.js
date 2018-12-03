/**
 * Created by Sandon on 2018/12/3.
 */
import matrixRotation from '../solution2.js'
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
console.log(matrixRotation(testMatrix2, 7, 5, 4).toString() == testMatrix2Rotate7TimesOutput.toString())
