/**
 * Created by Sandon on 2017/9/18.
 */
function merge(arr1, arr2) {
  const arr1Len = arr1.length
  const arr2Len = arr2.length
  let lastInsert
  let res = []
  let i = 0, j = 0
  while (i !== arr1Len && j !== arr2Len) {
    if (arr1[i] > arr2[j]) {
      if (arr2[j] !== lastInsert) {
        res.push(arr2[j])
        lastInsert = arr2[j]
      }
      j++
    } else {
      if (arr1[i] !== lastInsert) {
        res.push(arr1[i])
        lastInsert = arr1[i]
      }
      i++
    }
  }
  if (i !== arr1Len) {
    if (arr1[i] === lastInsert){
      i++
    }
    while (i !== arr1Len) {
      res.push(arr1[i])
      i++
    }
  }
  if (j !== arr2Len) {
    if (arr2[j] === lastInsert){
      j++
    }
    while (j !== arr2Len) {
      res.push(arr2[j])
      j++
    }
  }
  
  return res
}
// todo unfinished