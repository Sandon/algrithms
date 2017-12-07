/**
 * Created by Sandon on 2017/12/6.
 */
function quickSort (arr, start, end) {
  if (end - start < 2) return
  
  const index = partition(arr, start, end)
  quickSort(arr, start, index)
  quickSort(arr, index + 1, end)
}

function partition (arr, start, end) {
  /*if (end - start < 2) return -1*/
  const targetEle = arr[start]
  let first = start, last = end - 1
  while (true) {
    // find the one smaller than target element from right to left
    while (arr[last] >= targetEle && first !== last) {
      last--
    }
    if (first === last) {
      arr[first] = targetEle
      return first
    }
    arr[first] = arr[last]
    first++
    
    // find the one bigger than target element from left to right
    while (arr[first] < targetEle && first !== last)
      first++
    if (first === last) {
      arr[last] = targetEle
      return last
    }
    arr[last] = arr[first]
    last--
  }
}

function sortAndRemoveContinuity (str) {
  let arr = str.split(',')
  arr = arr.map(item => parseInt(item))
  quickSort(arr, 0, arr.length)
  arr.push(-1)
  let result = []
  let isLastContinuity = false
  const guard = arr.length - 1
  for (let i = 0; i !== guard; i++) {
    if (!isLastContinuity) {
      result.push(arr[i])
    } else if (arr[i] + 1 != arr[i + 1]) {
      result.push(arr[i])
    } else {
      // do nothing
    }
    isLastContinuity = arr[i] + 1 === arr[i + 1]
  }
  return result.join(' ')
}

/* test */
/*
// 1,2,3,4,10,20,30,100,101,102,103
// 1,4,10,20,30,100,103
const str = '3,102,2,30,101,1,103,20,100,10,4'
console.log(sortAndRemoveContinuity(str))

// 1,3,5,6,7,8,10,20,30,100,101,102,103,1000,10001
// 1,3,5,8,10,20,30,100,103,1000,10001
const str1 = '1,1000,3,5,100,6,30,8,10,7,20,101,102,103,10001'
console.log(sortAndRemoveContinuity(str1))
*/
