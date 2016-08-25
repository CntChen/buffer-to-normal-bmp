/**
 * TDD
 * Wirte by ES5 
 * @data 2016-08-24
 */

var fs = require('fs');
var bmp = require("bmp-js");

var BufferToNormalBmp = require('../dist/index.js').BufferToNormalBmp;
var RgabBufferBitTransform = require('../dist/rgba-buffer-bit-transform.js');

////
console.log('test', 'BufferToNormalBmp');
////
var bmpBuffer = fs.readFileSync(__dirname + '/test_24.bmp');
var bmpData = bmp.decode(bmpBuffer);
var bmpPixelBuffer = bmpData.data;

var myBufferToNormalBmp = new BufferToNormalBmp(bmpPixelBuffer, 60, 20);
var bmpHeaderBuffer = myBufferToNormalBmp.to32bitBmpBuffer();

fs.writeFileSync(__dirname + '/mybmpHeaderBuffer.bmp', bmpHeaderBuffer);


////
console.log('test', 'RgbaBufferBitTransform');
////
console.log(RgabBufferBitTransform);
var ragbBuffer32 = Buffer.from('01020304', 'hex');
console.log(ragbBuffer32);
var rgbaBuffer24 = RgabBufferBitTransform.from32To24(ragbBuffer32);
console.log(rgbaBuffer24);
var rgbaBuffer16 = RgabBufferBitTransform.from32To16(ragbBuffer32);
console.log(rgbaBuffer16);
