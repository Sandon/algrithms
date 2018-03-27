/**
 * Created by Sandon on 2017/9/17.
 */
const fs = require('fs')
const path = require('path')

let answers = fs.readFileSync(path.join(__dirname, '../querykey/answer.txt'), 'utf-8').split('\n')
answers = answers.filter((value) => {
  return !!value
})
let queries = fs.readFileSync(path.join(__dirname, '../querykey/query.txt'), 'utf-8').split('\n')
queries = queries.filter((value) => {
  return !!value
})
const len = answers.length

module.exports = function (fn) {
  for (let i = 0; i !== len; i++) {
    /*console.log(queries[i])
    console.log(fn(queries[i]))
    console.log(answers[i])*/
    if (fn(queries[i]) !== answers[i]) {
      console.log(i)
      return false
    }
  }
  return true
}
