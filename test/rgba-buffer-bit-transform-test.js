/**
 * @date    2016.08.25
 */

var RgabBufferBitTransform = require('../dist/rgba-buffer-bit-transform.js');

function test() {
  ////
  console.log('test', 'RgbaBufferBitTransform');
  ////
  var ragbBuffer32 = Buffer.from('00FF00FF', 'hex');
  console.log(ragbBuffer32);
  var rgbaBuffer32To24 = RgabBufferBitTransform.from32To24(ragbBuffer32);
  console.log(rgbaBuffer32To24);
  var rgbaBuffer24To32 = RgabBufferBitTransform.from24To32(rgbaBuffer32To24);
  console.log(rgbaBuffer24To32);
  var rgbaBuffer32To16 = RgabBufferBitTransform.from32To16(ragbBuffer32);
  console.log(rgbaBuffer32To16);
  var rgbaBuffer16To32 = RgabBufferBitTransform.from16To32(rgbaBuffer32To16);
  console.log(rgbaBuffer16To32);
}

test();