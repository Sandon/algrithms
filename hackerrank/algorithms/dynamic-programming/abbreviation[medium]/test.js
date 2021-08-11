/**
 * Maintained by Sandon.
 */
const guard = 2000
let i = 0
function f() {
  i++
  if (i > guard) return

  f()
}

f()
