/**
 * Created by Sandon on 2018/12/9.
 */
function test () {
  const arr = [0]
  for (let i = 0; i !== arr.length; i++) {
    if (i < 100) {
      arr.push(i + 1)
    }
    console.log(arr[i])
  }
}
// test()

function testSort () {
  let arr = [
    {id: 2},
    {id: 3},
    {id: 1}
  ]
  arr = arr.sort((a, b) => a.id - b.id)
  console.log(arr)
}
testSort()
