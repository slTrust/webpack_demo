### 生产和开发模式

拥有 2 个配置文件在 webpack 中是的常见模式。

一个典型的项目可能有：

- 用于开发的配置文件，配置热更新、跨域配置、端口设置等
- 用于生产的配置文件，配置 js 压缩、代码拆分等

虽然较大的项目可能仍然需要 2 个配置文件，但在 webpack4 中，你可以在没有一行配置的情况下完成

webpack4 引入了  production(生产)  和  development(开发)  模式。

细心的朋友会发现在 npm run build 打包后会有一段报警提示

```
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
```

> 'mode' 选项尚未设置，webpack 将回退到 'production'。 将 “mode” 选项设置为 'development' 或 'production' 以启用每个环境的默认值。您还可以将其设置为 'none' 以禁用任何默认行为

1. 打开package.json 并修改 scripts部分
    ```
    "dev": "webpack --mode development",
    "build": "webpack --mode production"
    ```

2. 运行 npm run dev 和 npm run build
    - 一个是不压缩的文件
    - 一个是打包后的文件

> production mode(生产模式)  可以开箱即用地进行各种优化。 包括压缩，作用域提升，tree-shaking 等。

另一方面，development mode(开发模式) 针对速度进行了优化，仅仅提供了一种不压缩的 bundle

在 webpack4 中，可以在没有一行配置的情况下完成任务！ 只需定义 –mode 参数即可获得所有内容！

