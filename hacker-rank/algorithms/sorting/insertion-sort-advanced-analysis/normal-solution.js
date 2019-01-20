export function insertionSortNormal (arr) {
  const len = arr.length
  let result = 0
  for (let i = 1; i < len; i++) {
    const target = arr[i]
    let index = 0
    // find the right position
    for (let j = i - 1; j !== -1; j--) {
      if (target >= arr[j]) {
        index = j + 1
        break
      }
    }
    // move one step from ${index} to ${i - 1}
    for (let k = i - 1; k >= index; k--) {
      arr[k + 1] = arr[k]
      result++
    }
    // put target in right place
    arr[index] = target
  }

  return result
}
// console.log(insertionSort([2, 1, 3, 1, 2]))

