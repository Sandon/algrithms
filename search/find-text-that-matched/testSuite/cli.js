/**
 * Created by Sandon on 2017/9/18.
 */
const request = require('request')

const url = 'http://127.0.0.1:8080/find/%E9%95%BF%E5%9F%8E%E5%AC%B4%E6%B0%8F%E8%AE%BE%E9%98%B2%E8%83%A1%EF%BC%8C%E7%83%9D%E6%B2%99%E7%AD%91%E5%86%A4%E5%9E%92%E3%80%82%E8%92%99%E5%85%AC%E5%8F%96%E5%8B%8B%E5%90%8D%EF%BC%8C%E5%B2%82%E7%AE%97%E7%94%9F%E6%B0%91%E6%AD%BB%E3%80%82%E8%BF%90%E7%95%9A%E5%8A%9B%E4%B8%8D%E7%A6%81%EF%BC%8C%E6%B0%B8%E7%BB%AD%E7%9B%98%E5%AD%98%E6%B3%95%E7%A2%8E%E8%BA%AB%E7%A0%82%E7%A2%9B%E9%87%8C%E7%94%B5%E8%A7%A3%E6%A7%BD%E4%B8%8A%E9%83%A8%E7%BB%93%E3%80%82%E9%BB%94%E9%BB%8E%E6%AC%B2%E5%8D%8A%E7%A9%BA%E4%B8%BB%E4%BA%95%E4%B8%B4%E6%97%B6%E4%BA%95%E9%A2%88%EF%BC%8C%E7%94%B5%E8%B7%AF%E4%BA%A4%E6%8D%A2%E5%9F%9F%E9%95%BF%E5%9F%8E%E8%88%82%E5%A5%BD%E5%A4%9A%E6%83%8A%E5%96%9C%E6%9C%AA%E5%B7%B2%E3%80%82%E7%9A%87%E5%B9%B3%E8%A1%A1%E5%8E%8B%E5%8A%9B%E5%A4%A9%E6%BD%9C%E9%BC%93%E6%80%92%EF%BC%8C%E5%8A%9B%E5%8C%96%E4%B8%80%E5%A5%B3%E5%AD%90%E3%80%82%E9%81%82%E4%BD%BF%E4%B8%87%E9%9B%89%E5%B4%A9%EF%BC%8C%E4%B8%8D%E5%B0%BD'

function req() {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if (error)
        reject()
      
      resolve()
    })
  })
}

console.time('cliReq')
let promises = []
for (let i = 0; i !== 1000; i++) {
  promises.push(req())
}
Promise.all(promises).then(() => {
  console.timeEnd('cliReq')
})

