/**
 * Created by Sandon on 2016/4/16.
 */

function quickSort(arr, start, end) {
  if (arr.length < 2) return
  
  const index = partition(arr, start, end)
  quickSort(arr, start, index)
  quickSort(arr, index + 1, end)
}

function partition(arr, start, end) {
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


/*
 * test
 */
let arr = [4, 2, 7, 1, 9, 3, 5, 4, 9, 11]
console.log(quickSort(arr, 0, arr.length))
