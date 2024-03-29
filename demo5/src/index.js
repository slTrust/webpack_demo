/*
import './a.js'
import './b.js'

// 异步代码
function getComponent() {
  // 使用异步的形式导入 lodash，default: _ 表示用 _ 代指 lodash
  return import('lodash').then(({ default: _ }) => {
    var element = document.createElement('div')
    element.innerHTML = _.join(['hello', 'world'], '-')
    return element
  })
}

getComponent().then(element => {
  document.body.appendChild(element)
})
*/

/*
上面那种异步的写法可能比较绕，现在精简一下，并且 webpack 对异步代码通过注释可以直接修改打包后的名称，以下代码全部以异步的形式引入
 */

 // 异步代码
import(/* webpackChunkName: 'a'*/ './a').then(function(a) {
    console.log(a)
})
  
import(/* webpackChunkName: 'b'*/ './b').then(function(b) {
    console.log(b)
})

import(/* webpackChunkName: 'use-lodash'*/ 'lodash').then(function(_) {
    console.log(_.join(['1', '2']))
})
  