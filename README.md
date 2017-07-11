## Vue From Scratch
### 初始化配置
```
npm init -y
```
### 添加忽略文件
```
node_modules/
.DS_Store
/*.log
package-lock.json
```

### 添加babel、eslint、EditorConfig等开发工具
```
npm i -D babel-cli babel-preset-env eslint
```
新建两个文件，.eslintrc，.babelrc，.editorconfig内容如下:
```js
//.eslintrc
{
    "rules": {
        "semi": [2, "always"],
        "quotes": [2, "double"]
    }
}
//.babelrc
{
  "presets": ["env"]
}
//.editorconfig
root = true
[*]
end_of_line = lf
insert_final_newline = true
[*.js]
charset = utf-8
indent_style = space
indent_size = 2
```
### 添加服务端程序
- 创建public/css/style.css文件，创建src/client，src/shared文件夹。新建src/shared/config.js与src/shared/utils.js，文件内容如下:
```js
//config.js
export const WEB_PORT = process.env.PORT || 8000;
export const STATICPATH = "/static";
export const APP_NAME = "MY APP";
//utils.js
export const isProd = process.env.NODE_ENV === "production";
```
- 添加服务端应用依赖express,compression，nodemon，新建src/server/index.js文件，内容如下：
```js
import compression from 'compression';
import express from 'express';

import { APP_NAME, STATIC_PATH, WEB_PORT } from '../shared/config';
import { isProd } from '../shared/utils';
import renderApp from './render-app';
const app = express();
app.use(compression());
app.use(STATIC_PATH, express.static('dist'));
app.use(STATIC_PATH, express.static('public'));

app.get('/', (req, res) => {
  res.send(renderApp(APP_NAME));
});

app.listen(WEB_PORT, () => {
  console.log(`Server runngin on port ${WEB_PORT}`);
});
```
- 新建src/server/render-app.js文件，用于在服务端生成页面内容如下:
```js
const renderApp = (title) =>
`<!doctype html>
<html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="${STATIC_PATH}/css/style.css">
  </head>
  <body>
    <h1>${title}</h1>
  </body>
</html>
`;

export default renderApp;
```
- 在package.json的scripts中添加:
```js
//忽略lib目录
"dev:start": "nodemon --ignore lib --exec babel-node src/server",
```
- 添加其他进程管理pm2，跨平台的文件删除应用rimraf，跨平台的环境变量程序cross-env，
```
npm i -D pm2 rimraf cross-env
```

### 添加webpack和HMR
- 在src/shared/config.js中添加以下内容
```js
export const WDS_PORT = 7000;
export const APP_CONTAINER_CLASS = 'js-app';
export const APP_CONTAINER_SELECTOR = `.${APP_CONTAINER_CLASS}`;
```
- 新建客户端渲染脚本src/client/index.js，内容如下:
```js
import 'babel-polyfill';
import { APP_CONTAINER_SELECTOR } from '../shared/config';
document.querySelector(APP_CONTAINER_SELECTOR).innerHTML = '<h1>Hello Webpack!</h1>';
```
- 接下来需要将ES6的客户端代码打包为ES5,首先，安装相关依赖
```
npm i -D webpack webpack-dev-server babel-core babel-loader
```
然后在工程目录下新建文件webpack.config.babel.js，内容如下
```js
import path from 'path';
import { WDS_PORT } from './src/shared/config';
import { isProd } from './src/shared/utils';
export default {
  entry: ['./src/client'],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: isProd ? '/static/' : `http://localhost:${WDS_PORT}/dist/`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: isProd ? false : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: WDS_PORT
  }
};
```
在scripts中添加命令:
```bash
"dev:wds":"webpack-dev-server --progress"
```
然后更新render-app.js的文件内容，使之可以通过客户端脚本渲染body内容。更新后的内容如下:
```js
import { APP_CONTAINER_CLASS, STATIC_PATH, WDS_PORT } from '../shared/config'
import { isProd } from '../shared/util'

const renderApp = (title: string) =>
`<!doctype html>
<html>
  <head>
    <title>${title}</title>
    <link rel="stylesheet" href="${STATIC_PATH}/css/style.css">
  </head>
  <body>
    <div class="${APP_CONTAINER_CLASS}"></div>
    <script src="${isProd ? STATIC_PATH : `http://localhost:${WDS_PORT}/dist`}/js/bundle.js"></script>
  </body>
</html>
`

export default renderApp
```
在一个终端运行npm run dev:start，在另一个运行npm run dev:wds，打开浏览器输入:http://localhost:8000，即可查看页面
- 接下来集成Vuejs，安装相关依赖
```js
npm i -S vue axios vuex vue-router
```

在客户端中新建组件App.vue，内容如下:
```html
<template>
  <h2>
    Hello dolblooks nicey</h2>
</template>
<script>
export default {
  created(){
    console.log('instance created');
  }
}
</script>
<style>
</style>
```
更新客户端的index.js文件，内容如下:
```js
import Vue from 'vue';
import App from './App.vue';
new Vue({
  el:APP_CONTAINER_SELECTOR,
  render:h=>h(App)
});
```

### TODO
1. 添加Flow静态类型检查
2. TypeScript的选用


### Error Logs
 Q: Parsing error:the keyword export is reserved 
 
 A: https://github.com/yannickcr/eslint-plugin-react/issues/447#issuecomment-184617282,
 ```
 npm i -D babel-eslint
 ```
 在.eslintrc中添加:
 ```
 "parser": "babel-eslint"
 ```

 Q:You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.

 A: 运行时的vue不包含模板编译器，不能在入口脚本中直接写template，可以通过render函数进行渲染或者使用带有编译器版本的Vue

 Q:Cannot find module 'vue-template-compiler'  
 
 A:npm i -D vue-template-compiler
