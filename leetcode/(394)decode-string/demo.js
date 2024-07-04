const i = '3[a2[c]xy4[f]]2[bc]'

const data = {
  times: 1,
  content: [
    {
      times: 3,
      content: [
        'a',
        {
          times: 2,
          content: ['c']
        },
        'xy',
        {
          times: 4,
          content: ['f']
        }
      ],
      result: ''
    },
    {
      times: 2,
      content: ['bc'],
      result: ''
    }
  ],
  result: ''
}

const r = {
  "times": 1,
  "content": [{
    "times": 3,
    "content": ["a", {"times": 2, "content": ["c"]}, "xy", {"times": 4, "content": ["f"]}]
  }, {"times": 2, "content": ["bc"]}]
}
