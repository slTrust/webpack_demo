### 覆盖默认 entry/output

1. 检验 webpack 规范支持

webpack 支持 ES6, CommonJS, AMD 规范

创建 vendor 文件夹，其中 minus.js、multi.js 和 sum.js 分别用 CommonJS、AMD 和 ES6 规范编写

```
// minus.js
module.exports = function(a, b) {
  return a - b
}

// multi.js
define(function(require, factory) {
  'use strict'
  return function(a, b) {
    return a * b
  }
})

// sum.js
export default function(a, b) {
  return a + b
}
```

在 app.js 文件中引入以上三个 js 文件

```
/**
 * webpack 支持 ES6、CommonJs 和 AMD 规范
 */

// ES6
import sum from './vendor/sum'
console.log('sum(1, 2) = ', sum(1, 2))

// CommonJs
var minus = require('./vendor/minus')
console.log('minus(1, 2) = ', minus(1, 2))

// AMD
require(['./vendor/multi'], function(multi) {
  console.log('multi(1, 2) = ', multi(1, 2))
})
```

2. 编写配置文件覆盖 entry/output

webpack.config.js 是 webpack 默认的配置文件名，在根目录下创建

```
const path = require('path')

module.exports = {
  entry: {
    app: './app.js' // 需要打包的文件入口
  },
  output: {
    publicPath: __dirname + '/dist/', // js 引用的路径或者 CDN 地址
    path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
    filename: 'bundle.js' // 打包后生产的 js 文件
  }
}
```

path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。

__dirname: 当前模块的文件夹名称。

可以使用 console.log 输出一下就明白了

```
const path = require('path')

console.log('__dirname: ', __dirname)
console.log('path.resolve: ', path.resolve(__dirname, 'dist'))

module.exports = {
  entry: {
    app: './app.js' // 需要打包的文件入口
  },
  output: {
    publicPath: __dirname + '/dist/', // js 引用的路径或者 CDN 地址
    path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
    filename: 'bundle.js' // 打包后生产的 js 文件
  }
}
```

执行 npm run build 打包 js 文件

会发现生成了 dist 文件夹，并生成了两个打包后的文件

```
dist/1.bundle.js
dist/bundle.js
```

这跟 AMD 的引入方式有关，如果在 app.js 中注释掉 AMD 的写法，则只会打包出一个 bundle.js 文件

> #### 在实际写代码的时候，最好使用 ES6 和 CommonJS 的规范来写

当你注释 AMD 后，打包完 dist 中有多个文件，这是因为打包的时候，没有先删除 dist 文件，再打包，我们需要使用一个插件来帮我们实现，GitHub 链接：[clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin#options-and-defaults-optional)

1. 安装插件
    ```
    npm install clean-webpack-plugin --save-dev

    # 我的版本为
    npm i clean-webpack-plugin@2.0.0 --save-dev
    ```
2. 修改webpack

    ```
    const path = require('path')

    const CleanWebpackPlugin = require('clean-webpack-plugin')

    module.exports = {
        entry: {
            app: './app.js' // 需要打包的文件入口
        },
        output: {
            publicPath: __dirname + '/dist/', // js 引用的路径或者 CDN 地址
            path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
            filename: 'bundle.js' // 打包后生产的 js 文件
        },
        plugins: [
            new CleanWebpackPlugin() // 默认情况下，此插件将删除 webpack output.path目录中的所有文件，以及每次成功重建后所有未使用的 webpack 资产。
        ]
    }
    ```

之后再执行 npm run build 就可以了

打包后的 js 文件会按照我们的配置放在 dist 目录下，创建一个 html 文件，引用打包好的 js 文件，打开 F12 就能看到效果了

### 参考文章

[webpack4 系列教程 (一): 打包 JS](https://godbmw.com/passages/2018-07-30-webpack-pack-js/)
[Webpack4 教程：从零配置到生产模式](https://www.valentinog.com/blog/webpack/)