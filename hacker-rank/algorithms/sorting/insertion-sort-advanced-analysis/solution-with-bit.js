export function insertionSort (arr) {
  const max = 10000000
  const bit = new Array(max)
  for (let i = 0; i !== max; i++) {
    bit[i] = 0
  }

  function update (index) {
    while (index <= max) {
      bit[index]++
      index+= (index & (-index))
    }
  }

  function getPrefixSum (index) {
    let sum = 0
    while (index > 0) {
      sum += bit[index]
      index -= (index & (-index))
    }
    return sum
  }

  let result = 0
  for (let i = 0; i !== arr.length; i++) {
    update(arr[i])
    result += (i + 1 - getPrefixSum(arr[i]))
  }
  return result
}

// console.log(insertionSort([2, 1, 3, 1, 2]))
// console.log(insertionSort([4,3,1,2]))
