## buffer-to-normal-bmp
将RAGB的buffer转换为最通用的BMP格式。

## 背景
RT。

## 方法
根据BMP的文件规范生成文件。
主要参考：
>https://en.wikipedia.org/wiki/BMP_file_format
我看中文版的

## 格式说明
* 只转化为最通用的格式(结构名称：BITMAPINFOHEADER，bmp头为54byte，后面接pixel数据到eof)
* 支持保存为16bit，24bit，32bit
* 1bit，2bit，4bit，8bit是通过颜色索引表实现的，所以暂时不搞了

## 语法

## 坑
使用webpack打包为node模块后，引入了Buffer for Broswer
* 使用webpack打包，其中js文件使用了babel-loader，然后引入了Buffer for Broswer，问题是我这个模块是一个node模块啊，我没必要引入`Buffer`
```
    target: 'node',
    node: {
      Buffer: false
    },
    libraryTarget: 'commonjs2',
    library: 'BufferToNormalBmp',
```
该`webpack.config.js`配置并没有什么鸟用。

* 并且`Buffer.concat`报错，我不能忍
```
TypeError: "list" argument must be an Array of Buffers
```

* 这个问题要么是webpack没设置好打包平台引起的，也可能可以使用排除的语法来处理

* 可能是`babel-loader`引起的，自己去shim了js-core

* 使用
```
babel src/idnex.js -o dist/index.js
```
转译后的代码没有问题

* 在`package.json`中添加`script`，发布模块时候可以自动运行
>The prepublish script is automatically run whenever you type npm publish.
```
    "compile": "babel src/ -d dist/",
    "prepublish": "npm run compile"
```
>http://mammal.io/articles/using-es6-today/

* 如果不发布呢，直接clone，那用`gulp`或手工，随便啊

## 参考资料
>https://github.com/shaozilee/bmp-js

## END
