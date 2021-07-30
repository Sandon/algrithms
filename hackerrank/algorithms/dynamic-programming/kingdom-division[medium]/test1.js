/**
 * Maintained by Sandon.
 */
const loop = 72473
const limit = loop / 5
const loopLimit = loop * loop
for (let i = 0; i !== loopLimit; i++) {
  console.log(i)
}

let count = 0
function digui() {
  count++
  if (count > limit) {
    return
  }
  digui()
}
// digui()
