var trap = function(height) {
  const len = height.length
  const leftMax = []
  const rightMax = []
  
  leftMax[0] = height[0]
  for (let i = 1; i < len; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], height[i])
  }
  
  rightMax[len - 1] = height[len - 1]
  for (let i = len - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], height[i])
  }
  
  let res = 0
  for (let i = 0; i < len; i++) {
    res += Math.min(rightMax[i], leftMax[i]) - height[i]
  }
  
  return res
}
