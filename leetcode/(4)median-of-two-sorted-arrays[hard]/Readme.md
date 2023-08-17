把 arr1 和 arr2 各任意分成两部分，使得 arr1 左边部分长度 + arr2 左边部分长度 = n
对比 arr1Left 最后一个（arr1LeftLast）和 arr2Left 最后一个(arr2LeftLast)的大小：
    arr1LeftLast === arr2LeftLast: 那么第n个就是arr1LeftLast
    arr1LeftLast < arr2LeftLast: 说明整个 arr1Left 都在最小的n个元素内（反证法），抛弃 arr1Left 剩下的两个数组中找第 n - arr1Left.length 个
    arr1LeftLast > arr2LeftLast: 说明整个 arr2Left 都在最小的n个元素内，处理同上
