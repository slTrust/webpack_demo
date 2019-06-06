// document.addEventListener('click', () => {
//     import('./click.js').then(({ default: func }) => {
//         func()
//     })
// })

// 使用 webpack 的 webpackPrefetch 属性来实现 预加载
document.addEventListener('click', () => {
    import(/* webpackPrefetch: true */ './click.js').then(({ default: func }) => {
        func()
    })
})


