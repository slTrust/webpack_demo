### code splitting

package.json 如下

```
{
  "scripts": {
    "dev": "webpack --mode development",
    "build": "webpack --mode production"
  },
  "devDependencies": {
    "clean-webpack-plugin": "^2.0.0",
    "webpack": "^4.29.6",
    "webpack-cli": "^3.2.3"
  },
  "dependencies": {
    "lodash": "^4.17.11"
  }
}
```

我们在 src/ 文件夹下创建 index.js 文件

```
import _ from 'lodash'

console.log(_.join(['a', 'b', 'c']))
```

> #### 配置 webpack.config.js 文件

```
const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    publicPath: __dirname + '/dist/', // js 引用的路径或者 CDN 地址
    path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
    filename: '[name].bundle.js', // 代码打包后的文件名
    chunkFilename: '[name].js' // 代码拆分后的文件名
  },
  plugins: [new CleanWebpackPlugin()]
}
```

运行 npm run build 打包

在 index.html 中使用打包后的文件
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>代码分割</title>
  </head>

  <body>
    <script src="./dist/main.bundle.js"></script>
  </body>
</html>
```

使用浏览器打开 index.html 文件，进入控制台，可以看到如下信息：a,b,c

> #### 我们引用的第三方框架和我们的业务代码一起被打包，这样会有一个什么问题?

- 假设 lodash 为 1M，业务代码也为 1M，打包后假设为 2M
- 浏览器每次打开页面，都要先加载 2M 的文件，才能显示业务逻辑，这样会使得加载时间变长，
- 业务代码更新会比较频繁，第三方代码基本不会更改，这样重新打包后，假设为 2M，用户重新打开网页后，又会再加载 2M 文件
- 浏览器是有缓存的，如果文件没变动的话，就不用再去发送 http 请求，而是直接从缓存中取，这样在刷新页面或者第二次进入的时候可以加快网页加载的速度。

> #### 怎么解决呢，可以利用 webpack 中的代码分割

- 在 webpack4 之前是使用 commonsChunkPlugin 来拆分公共代码，v4 之后被废弃，并使用 splitChunksPlugins
- 在使用 splitChunksPlugins 之前，首先要知道 splitChunksPlugins 是 webpack 主模块中的一个细分模块，无需 npm 引入
现在我们来配置 webpack.config.js 文件

> #### 现在我们来配置 webpack.config.js 文件

```
const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    publicPath: __dirname + '/dist/', // js 引用的路径或者 CDN 地址
    path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
    filename: '[name].bundle.js', // 代码打包后的文件名
    chunkFilename: '[name].js' // 代码拆分后的文件名
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [new CleanWebpackPlugin()]
}
```

- 上面的代码段就是告诉 webpack，要做代码分割了，这里的 chunks: 'all' 是分割所有代码，包括同步代码和异步代码，webpack 默认是 chunks: 'async' 分割异步代码
- 我们使用 npm run dev 来打包开发环境下的代码，这样代码就不会压缩，方便我们来观察，可以看到代码被分割成两个文件了

> 打开 dist/main.bundle.js 文件，在最底部可以看到 src/index.js 文件，里面放的是业务逻辑的代码，但是并没有 lodash 的代码

> 打开 dist/vendors~main.js 文件，在最上面可以看到 lodash 模块

再次打开页面，控制台也输出了内容，这样就实现了 Code Splitting(代码分割)

其实没有 webpack 的时候，也是有代码分割的，不过是需要我们自己手动的分割，而现在使用了 webpack，
通过这种配置项的方式，它会自动帮我们去做代码分割

仔细看分割完的代码名称，vendors~main.js，我们对分割完的名称进行更改

还是在 splitChunks 的配置项中，添加 cacheGroups 对象

```
optimization: {
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      vendors: {
        name: 'vendors'
      }
    }
  }
}
```

再次打包就可以看到效果了，cacheGroups 的默认配置会定义 vendors 和 default
