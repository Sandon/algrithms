/**
 * Created by Sandon on 2019-09-18.
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

  let arr1LeftLen
  let arr2LeftLen
  if (arr1Len < arr2Len) {
    arr1LeftLen = arr1Len < n ? arr1Len : Math.floor(n/2)
    arr2LeftLen = n - arr1LeftLen
  } else {
    arr2LeftLen = arr2Len < n ? arr2Len : Math.floor(n/2)
    arr1LeftLen = n - arr2LeftLen
  }


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

var findMedianSortedArrays = function(nums1, nums2) {
  const len = nums1.length + nums2.length
  if (len % 2 === 0) {
    const index = len / 2
    const num1 = findNthInPlace(nums1, nums2, 0, 0, nums1.length, nums2.length, index)
    const num2 = findNthInPlace(nums1, nums2, 0, 0, nums1.length, nums2.length, index + 1)
    // console.log(index, num1, num2)
    return (num1 + num2) / 2
  } else {
    const index = Math.floor(len / 2)
    return findNthInPlace(nums1, nums2, 0, 0, nums1.length, nums2.length, index + 1)
  }
}

/*
 * test
 */
// const arr1 = [1, 3, 6, 9]
// const arr2 = [2, 5, 8, 10, 12]
// const n = 4
// console.log(findNthInPlace(arr1, arr2, 0, 0, arr1.length, arr2.length, n) === 5)

// let nums1 = [1, 3]
// let nums2 = [2]
// console.log(findMedianSortedArrays(nums1, nums2))
//
// nums1 = [1, 2]
// nums2 = [3, 4]
// console.log(findMedianSortedArrays(nums1, nums2))

let nums1 = [2,3,4]
let nums2 = [1]
console.log(findMedianSortedArrays(nums1, nums2))
console.log(findNthInPlace(nums1, nums2, 0, 0, nums1.length, nums2.length, 3))
