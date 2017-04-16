/**
 * Created by Sandon on 2016/4/15.
 */

// in-place version of finding the n-th element
function findNthInPlace(arr1, arr2, arr1StartIndex, arr2StartIndex, arr1Len, arr2Len, n) {
  if (arr1Len + arr2Len < n)
    return -1
  if (arr1Len === 0)
    return arr2[arr2StartIndex + n - 1]
  if (arr2Len === 0)
    return arr1[arr1StartIndex + n - 1]
  if (n === 1)
    return  arr1[arr1StartIndex] <= arr2[arr2StartIndex] ? arr1[arr1StartIndex] : arr2[arr2StartIndex]
  
  const arr1LeftLen = arr1Len < n ? arr1Len : Math.floor(n/2)
  const arr2LeftLen = n - arr1LeftLen
  
  const lastOfArr1Left = arr1[arr1StartIndex + arr1LeftLen - 1]
  const lastOfArr2Left = arr2[arr2StartIndex + arr2LeftLen - 1]
  if (lastOfArr1Left === lastOfArr2Left) {
    return lastOfArr1Left
  }
  else if (lastOfArr1Left < lastOfArr2Left) {
    return findNthInPlace(arr1, arr2,
      arr1StartIndex + arr1LeftLen,
      arr2StartIndex,
      arr1Len - arr1LeftLen,
      arr2LeftLen,
      n - arr1LeftLen)
  }
  else {
    return findNthInPlace(arr1, arr2,
      arr1StartIndex,
      arr2StartIndex + arr2LeftLen,
      arr1LeftLen,
      arr2Len - arr2LeftLen,
      n - arr2LeftLen)
  }
}

// find the n-th element
function findNth(arr1, arr2, n) {
  
}


/*
 * test
 */
const arr1 = [1, 3, 6, 9]
const arr2 = [2, 5, 8, 10, 12]
const n = 4
console.log(findNthInPlace(arr1, arr2, 0, 0, arr1.length, arr2.length, n) === 5)
