/**
 * Created by Sandon on 2017/9/15.
 */
const fs = require('fs')
const path = require('path')

let queries = fs.readFileSync(path.join(__dirname, '../querykey/query.txt'), 'utf-8')
queries = queries.split('\n')

module.exports = function (fn, data) {
  let times = 0
  let startTime
  queries.forEach(query => {
    startTime = (new Date()).getTime()
    fn(query, data)
    times += (new Date()).getTime() - startTime
  })
  console.log(`${fn.name} : ${times / queries.length} ms`)
}
