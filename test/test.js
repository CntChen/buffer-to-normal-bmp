/**
 * TDD
 * Wirte by ES5 
 * @data 2016-08-24
 */

var fs = require('fs');
var bmp = require("bmp-js");

var BufferToNormalBmp = require('../dist/index.js').default;

////
console.log('test', 'BufferToNormalBmp');
////
var bmpBuffer = fs.readFileSync(__dirname + '/test_24.bmp');
var bmpData = bmp.decode(bmpBuffer);
var bmpPixelBuffer = bmpData.data;

var myBufferToNormalBmp = new BufferToNormalBmp(bmpPixelBuffer, 60, 20);
// 32
var bmp32Buffer = myBufferToNormalBmp.to32bitBmpBuffer();
fs.writeFileSync(__dirname + '/bmp32.bmp', bmp32Buffer);
// 24
var bmp24Buffer = myBufferToNormalBmp.to24bitBmpBuffer();
fs.writeFileSync(__dirname + '/bmp24.bmp', bmp24Buffer);
// 16
var bmp16Buffer = myBufferToNormalBmp.to16bitBmpBuffer();
fs.writeFileSync(__dirname + '/bmp16.bmp', bmp16Buffer);


////
// RgbaBufferBitTransform
require('./rgba-buffer-bit-transform-test.js');
////