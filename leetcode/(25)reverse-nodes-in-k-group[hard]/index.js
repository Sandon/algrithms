let reverseKGroup = function (head, k) {
  let size = 0,
    cur = head;
  while (cur) {
    size++;
    cur = cur.next;
  }
  let dummyHead = new ListNode(-1),
    nums = Math.floor(size / k);
  dummyHead.next = head;
  let prev = dummyHead, // 指的是前一组的最后一个节点
    start = dummyHead.next;
  while (nums) {
    let count = k,
      // 已知 start 和 prev 得到 tail, p, q
      tail = start, // 指本组最后一个节点，本质就是本组未reverse时的的第一个节点
      p = start,
      q = start.next;
    
    // 本组内进行 reverse：从本组第二个节点开始，不停地把后面的节点放到最前面
    while (--count) {
      let next = q.next;
      q.next = p;
      p = q;
      q = next;
    }
    
    // 更新本组和上组及下组的连接
    prev.next = p;
    tail.next = q;
    
    // 更新 start 和 prev
    start = q;
    prev = tail;
    
    // 更新循环次数
    nums--;
  }
  return dummyHead.next
};
