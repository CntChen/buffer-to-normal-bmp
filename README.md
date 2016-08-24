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


## 参考资料
>https://github.com/shaozilee/bmp-js

## END
