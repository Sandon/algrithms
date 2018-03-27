/**
 * Created by Sandon on 2017/9/18.
 */
const http = require('http')
const fs = require('fs')
const cluster = require('cluster')

const testQuery = '长城嬴氏设防胡，烝沙筑冤垒。蒙公取勋名，岂算生民死。运畚力不禁，永续盘存法碎身砂碛里电解槽上部结。黔黎欲半空主井临时井颈，电路交换域长城舂好多惊喜未已。皇平衡压力天潜鼓怒，力化一女子。遂使万雉崩，不尽'

if (cluster.isMaster) {
  const os = require('os')
  let count = os.cpus().length
  count = count > 4 ? 4 : count
  for (var i = 0; i < count; i++) {
    cluster.fork()
  }
  console.log('master')
} else {
  let content = fs.readFileSync('./question/dataSet.txt', 'utf-8')
  
  let data = {keyMap: {subs: {}}}
  content.split('\n').forEach((line, index) => {
    line.trim().split('|').slice(1).forEach(keyword => {
      keyword = keyword.toLowerCase()
      const keywordLen = keyword.length
      
      // keyMap
      let keyObj = data.keyMap
      const guard = keywordLen + 1
      for (let i = 1; i !== guard; i++) {
        const key = keyword.slice(0, i)
        if (!keyObj.subs[key]) {
          keyObj.subs[key] = {
            lines: [],
            subs: {}
          }
        }
        
        keyObj = keyObj.subs[key]
      }
      keyObj.lines.push(index + 1)
    })
  })
  
  function matchLoopQuery(query, data) {
    query = query.toLowerCase()
    const len = query.length
    let res = []
    
    const keyMap = data.keyMap
    
    for (let i = 0; i !== len; i++) {
      let subs = keyMap.subs
      let guard = i + 7
      const lenGuard = len + 1
      guard = guard < lenGuard ? guard : lenGuard
      for (let j = i + 1; j !== guard; j++) {
        let keyObj = subs[query.slice(i, j)]
        if (!keyObj) {
          break
        }
        keyObj.lines.length && (res = res.concat(keyObj.lines))
        subs = keyObj.subs
      }
    }
    
    
    res = res.sort((a, b) => a - b)
    res = deDuplicate(res)
    
    //return res.length ? res.join(',') : 0
    return res.length && res.join(',')
  }
  
  function deDuplicate (arr) {
    const len = arr.length
    if (len < 2)
      return arr
    let res = [arr[0]]
    
    for (let i = 1; i !== len; i++) {
      if (arr[i] !== arr[i - 1]) {
        res.push(arr[i])
      }
    }
    
    return res
  }
  
  /* server */
  http.createServer(function (request, response) {
    // 下面这段对于favicon的处理，在最终提交是可以去掉，因为最终是通过工具访问接口，不会产生favicon
    const url = request.url
    if ('/favicon.ico' === url) {
      return
    }
    
    console.time('process')
    let query = request.url.slice(6)
    query = decodeURIComponent(query)
    
    const res = matchLoopQuery(query, data)
    console.timeEnd('process')
    
    response.writeHead(200, {"Content-Type": "text/plain"})
    response.end(res)
  }).listen(8080)
  
  // warm up
  for (let i = 0; i !== 10; i++) {
    matchLoopQuery(testQuery, data)
  }
  
  console.log('server listening on 8080')
}

