// const amount = 12

// if (amount < 10) {
//     console.log('small number')
// } else {
//     console.log('large number')
// }  

// const os = require('os')
// console.log(os.userInfo())

const _ = require('lodash')

const items = [1, [2, [3, [4]]]]
const newItems = _.flattenDeep(items)
console.log(newItems)