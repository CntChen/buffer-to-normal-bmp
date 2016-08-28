/**
 * @date    2016.08.25
 */

var BgraBufferBitTransform = require('../dist/bgra-buffer-bit-transform.js');

function test() {
  ////
  console.log('test', 'RgbaBufferBitTransform');
  ////
  // var bgraBuffer32 = Buffer.from('00FF00FF', 'hex');
  // var bgraBuffer32 = Buffer.from('FF0000FF', 'hex');
  var bgraBuffer32 = Buffer.from('00FF00FF', 'hex');

  console.log(bgraBuffer32);
  var bgraBuffer32To24 = BgraBufferBitTransform.from32To24(bgraBuffer32);
  console.log(bgraBuffer32To24);
  var bgraBuffer24To32 = BgraBufferBitTransform.from24To32(bgraBuffer32To24);
  console.log(bgraBuffer24To32);
  var bgraBuffer32To16 = BgraBufferBitTransform.from32To16(bgraBuffer32);
  console.log(bgraBuffer32To16);
  var bgraBuffer16To32 = BgraBufferBitTransform.from16To32(bgraBuffer32To16);
  console.log(bgraBuffer16To32);
}

test();