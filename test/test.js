/**
 * TDD
 * Wirte by ES5 
 * @data 2016-08-24
 */

var fs = require('fs');
var bmp = require("bmp-js");

var BufferToNormalBmp = require('../dist/index.js').BufferToNormalBmp;


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
// RgbaBufferBitTransform
require('./rgba-buffer-bit-transform-test.js');
////