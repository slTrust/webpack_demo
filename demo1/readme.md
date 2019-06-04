### 前言

- 学习webpack


> [建议使用 nrm 来切换源](https://blog.csdn.net/anway12138/article/details/79455224)

```
# 全局安装 nrm
npm install -g nrm 

# 查看可选源
nrm ls

# 切换源
nrm use taobao

# 测试速度
nrm test npm 
```

### 搭建项目并打包 JS 文件

#### 创建空文件夹，通过运行以下命令初始化 package.json

```
npm init -y
```

#### 引入webpack4

```
npm i webpack --save-dev
```

还需要  webpack-cli ，作为一个单独的包引入，如果不装 webpack-cli 是无法在命令行里使用 webpack 的

```
npm i webpack-cli --save-dev
```

此项目 webpack 版本如下：

```
"webpack": "^4.29.6",
"webpack-cli": "^3.2.3"


所以你可以这样
npm i webpack@4.29.6 webpack-cli@3.2.3 --save-dev
```

### package.json 里添加一个构建脚本

```
"scripts": {
    "build":"webpack",
},
```

> #### 测试这个新功能，首先创建 ./src/index.js 文件

尝试运行看看会发生什么：

```
npm run build
```

会把文件生成到dist/main.js里 并且是压缩后的

> 在 webpack4 以前的版本中，必须在名为 webpack.config.js 的配置文件中 通过 entry 属性定义 entry point(入口点)，就像这样：

```
entry:'./app/index.js' // 入口文件
```

从 webpack4 开始，不再必须定义 entry point(入口点) ：它将默认为 ./src/index.js


> #### 它将查找 ./src/index.js 作为默认入口点。 而且，它会在 ./dist/main.js 中输出模块包，目前代码量小，可以格式化看效果




