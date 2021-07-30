/**
 * Maintained by Sandon.
 */
const kingdomDivision = require('../index2.js')
const input = require('./input.js')
const inputArr = input.split('\n').filter((line) => !!line)
const roads = []

for (let i = 1; i !== inputArr.length; i++) {
  roads.push(inputArr[i].replace(/\s+$/g, '').split(' ').map(roadsTemp => parseInt(roadsTemp, 10)))
}
// console.log(roads.length)

console.log(kingdomDivision(roads.length + 1, roads))
