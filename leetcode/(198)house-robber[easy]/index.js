/**
 * Maintained by Sandon.
 */
var rob = function(nums) {
  if (nums.length === 0) {
    return 0
  } else if (nums.length === 1) {
    return nums[0]
  }
  const value = []
  value[0] = nums[0]
  value[1] = Math.max(nums[0], nums[1])
  const len = nums.length
  for (let i = 2; i < len; i++) {
      value[i] = Math.max(value[i - 1], value[i - 2] + nums[i])
  }
  return value[len - 1]
}

console.log(rob([1, 3, 4, 3, 0, 2, 7]))
