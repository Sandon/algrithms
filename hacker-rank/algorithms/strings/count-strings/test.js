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
test()
