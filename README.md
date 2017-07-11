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
### 安装vue相关依赖
```
npm i -S vue axios vuex vue-router
```
### 添加babel、eslint、EditorConfig等开发工具
```
npm i -D babel-cli babel-preset-env eslint
```
新建两个文件，.eslintrc，.babelrc，.editorconfig内容如下:
```
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
```
//config.js
export const WEB_PORT = process.env.PORT || 8000;
export const STATICPATH = "/static";
export const APP_NAME = "MY APP";
//utils.js
export const isProd = process.env.NODE_ENV === "production";
```
- 添加服务端应用依赖express,compression，nodemon，新建src/server/index.js文件，内容如下：
```
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
```
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
```
"dev:start": "nodemon --ignore lib --exec babel-node src/server"
```
- 添加其他进程管理pm2，跨平台的文件删除应用rimraf，跨平台的环境变量程序cross-env，
```
npm i -D pm2 rimraf cross-env
```
### TODO
1. 添加Flow静态类型检查


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
