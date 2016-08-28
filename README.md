## buffer-to-normal-bmp
将32/24/16 bit的BMP buffer转换为最通用的BMP格式。

## 实现功能
* 为BMP的像素buffer**添加BMP头**，返回可直接保存为BMP文件的buffer
* 实现32/24/16bit 图片的相互转换（目前需要传入的是像素buffer）

## 语法
### 输入数据
* 32bit buffer **BGRA**
* 24bit buffer **BGR**
* 16bit buffer **BGR565**

### 输出数据
* 可直接保存为BMP文件的buffer

### 函数


## 背景
RT。

## 实现原理
根据BMP的文件规范生成文件。
主要参考：
>https://en.wikipedia.org/wiki/BMP_file_format

## 格式说明
* 只转化为最通用的格式(结构名称：BITMAPINFOHEADER，bmp头为54byte，后面接pixel数据到eof)
* 支持保存为16bit，24bit，32bit
* 1bit，2bit，4bit，8bit是通过颜色索引表实现的，所以暂时不搞了

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

## 坑
坑坑坑坑
文件是LE 小端存储，数值的低位在内存中的低位。
对于24bit，我们常说要存入RGB,在bmp中是BGR，其实是小端存储引起的。
对于一个byte是一个颜色分量，我们最多就把颜色换错了。
但是对于16bit，一个颜色不足一个byte。通常是565或5551.
实际为RG1G2B,存储则为

## TODO
buffer.length % 4 == 0 

## END
