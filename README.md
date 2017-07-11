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
### 添加HTTP服务

### TODO
1. 添加Flow静态类型检查
