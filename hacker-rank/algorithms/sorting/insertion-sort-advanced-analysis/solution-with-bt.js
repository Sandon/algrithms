export function insertionSort (arr) {
  let result = 0, len = arr.length
  let root = {value: arr[0], sameCount: 1, biggerCount: 0, left: null, right: null}
  for (let i = 1; i < len; i ++) {
    const value = arr[i]
    let node = root
    while (node) {
      if (node.value === value) {
        node.sameCount++
        result += node.biggerCount
        break
      } else if (value < node.value) {
        result += (node.biggerCount + node.sameCount)
        if (node.left) {
          node = node.left
        } else {
          node.left = {value, sameCount: 1, biggerCount: 0, left: null, right: null}
          break
        }
      } else {
        node.biggerCount++
        if (node.right) {
          node = node.right
        } else {
          node.right = {value, sameCount: 1, biggerCount: 0, left: null, right: null}
          break
        }
      }
    }
  }
  return result
}

// console.log(insertionSort([2, 1, 3, 1, 2]))