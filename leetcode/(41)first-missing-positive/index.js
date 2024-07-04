/**
 * @param {number[]} nums
 * @return {number}
 */
// 时间 O(n), 空间 O(n)
var firstMissingPositive = function(nums) {
  const map = {}
  nums.forEach((_) => {
    map[_] = true
  })
  
  let i = 1;
  while (true) {
    if (map[i]) {
      i++
    } else {
      return i
    }
  }
}

// 时间 O(n), 空间 O(1)
// todo
