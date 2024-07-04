const partition = function (nums, l, r) {
  // 随机
  const x = Math.floor((r - l + 1) * Math.random()) + l
  const tmp = nums[l]
  nums[l] = nums[x]
  nums[x] = tmp
  
  // 正式开始
  const target = nums[l]
  let left = l, right = r
  while (true) {
    // find smaller one from right
    while (nums[right] >=  target && left !== right) {
      right--
    }
    if (left === right) {
      nums[left] = target
      return left
    }
    nums[left] = nums[right]
    left++
    
    // find bigger one from left
    while (nums[left] <= target && left !== right) {
      left++
    }
    if (left === right) {
      nums[right] = target
      return right
    }
    nums[right] = nums[left]
    right--
  }
}
const quickSelect = function (nums, l, r, k) {
  if (l === r) {
    return nums[l]
  }
  const index = partition(nums, l, r)
  const rightLen = nums.length - index
  if (rightLen === k) {
    return nums[index]
  } else if (rightLen > k) {
    return quickSelect(nums, index + 1, r, k)
  } else {
    return quickSelect(nums, l, index - 1, k)
  }
}
var findKthLargest = function(nums, k) {
  return quickSelect(nums, 0, nums.length - 1, k)
}

// test
const test1 = [3,2,3,1,2,4,5,5,6]
console.log(findKthLargest(test1, 4))
