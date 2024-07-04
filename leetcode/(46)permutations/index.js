var permute = function(nums) {
  const len = nums.length
  const arr = new Array(len)
  arr[0] = [[nums[0]]]
  for (let i = 1; i < len; i++) {
    arr[i] = []
    const num = nums[i]
    const pre = arr[i - 1]
    for (let j = 0; j < pre.length; j++) {
      const option = pre[j]
      debugger
      for (let k = 0; k < option.length; k++) {
        const optionsCopy = [...option]
        optionsCopy.splice(k, 0, num)
        arr[i].push(optionsCopy)
      }
      const optionsCopy = [...option]
      optionsCopy.push(num)
      arr[i].push(optionsCopy)
    }
  }
  
  return arr[len - 1]
}

permute([1,2,3])
