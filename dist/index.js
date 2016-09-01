'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BufferToNormalBmp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by CntChen 2016.08.24
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 将RAGB的buffer数据转换为BMP文件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _bgraBufferBitTransform = require('./bgra-buffer-bit-transform.js');

var BgraBufferBitTransform = _interopRequireWildcard(_bgraBufferBitTransform);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BufferToNormalBmp = function () {
  function BufferToNormalBmp(bgraBuffer, width, height) {
    _classCallCheck(this, BufferToNormalBmp);

    var inputPixelBit = Number.parseInt(bgraBuffer.length / width / height * 8);
    this.bgraBuffer = BgraBufferBitTransform['from' + inputPixelBit + 'To32'] && BgraBufferBitTransform['from' + inputPixelBit + 'To32'](bgraBuffer) || Buffer.from(bgraBuffer);
    this.width = width;
    this.height = height;
  }

  _createClass(BufferToNormalBmp, [{
    key: '_setBmpHeader',
    value: function _setBmpHeader(bmpHeaderParams) {
      var flag = bmpHeaderParams.flag;
      var fileSize = bmpHeaderParams.fileSize;
      var reserved = bmpHeaderParams.reserved;
      var offset = bmpHeaderParams.offset;
      var headerSize = bmpHeaderParams.headerSize;
      var width = bmpHeaderParams.width;
      var height = bmpHeaderParams.height;
      var planes = bmpHeaderParams.planes;
      var bitPP = bmpHeaderParams.bitPP;
      var compress = bmpHeaderParams.compress;
      var rawSize = bmpHeaderParams.rawSize;
      var hr = bmpHeaderParams.hr;
      var vr = bmpHeaderParams.vr;
      var colors = bmpHeaderParams.colors;
      var importantColors = bmpHeaderParams.importantColors;


      var bmpHeaderSize = 54;
      var bmpHeaderBuffer = new Buffer(bmpHeaderSize);

      var pos = 0;
      bmpHeaderBuffer.write(flag, pos);
      pos += 2;
      bmpHeaderBuffer.writeUInt32LE(fileSize, pos);
      pos += 4;
      bmpHeaderBuffer.writeUInt32LE(reserved, pos);
      pos += 4;
      bmpHeaderBuffer.writeUInt32LE(offset, pos);
      pos += 4;
      bmpHeaderBuffer.writeUInt32LE(headerSize, pos);
      pos += 4;
      bmpHeaderBuffer.writeUInt32LE(width, pos);
      pos += 4;
      bmpHeaderBuffer.writeUInt32LE(height, pos);
      pos += 4;
      bmpHeaderBuffer.writeUInt16LE(planes, pos);
      pos += 2;
      bmpHeaderBuffer.writeUInt16LE(bitPP, pos);
      pos += 2;
      bmpHeaderBuffer.writeUInt32LE(compress, pos);
      pos += 4;
      bmpHeaderBuffer.writeUInt32LE(rawSize, pos);
      pos += 4;
      bmpHeaderBuffer.writeUInt32LE(hr, pos);
      pos += 4;
      bmpHeaderBuffer.writeUInt32LE(vr, pos);
      pos += 4;
      bmpHeaderBuffer.writeUInt32LE(colors, pos);
      pos += 4;
      bmpHeaderBuffer.writeUInt32LE(importantColors, pos);
      pos += 4;

      return bmpHeaderBuffer;
    }

    /**
     * 协定传入的行数据是从上到下的，而BMP存储是从下到上的，所以需要转换一下
     */

  }, {
    key: '_getBgraArr',
    value: function _getBgraArr(pixelBuffer, pixelWidth, colorBitUnit) {
      pixelBuffer = Buffer.from(pixelBuffer);

      var bs = [];
      var gs = [];
      var rs = [];
      var as = [];
      for (var i = 0; i < width; i++) {
        bs.push(bgraBuffer.slice(4 * i + 0, 4 * i + 1));
        gs.push(bgraBuffer.slice(4 * i + 1, 4 * i + 2));
        rs.push(bgraBuffer.slice(4 * i + 2, 4 * i + 3));
        as.push(bgraBuffer.slice(4 * i + 3, 4 * i + 4));
      }

      var bufferArr = [];
      for (var _i = 0; _i < width; _i++) {
        bufferArr.push(bs[_i]);
        bufferArr.push(gs[_i]);
        bufferArr.push(rs[_i]);
        bufferArr.push(as[_i]);
      }

      return Buffer.concat(bufferArr);
    }
  }, {
    key: 'to32bitBmpBuffer',
    value: function to32bitBmpBuffer(bgraBuffer, pixelWidth, pixelHeight) {
      bgraBuffer = bgraBuffer || this.bgraBuffer;
      pixelWidth = pixelWidth || this.width;
      pixelHeight = pixelHeight || this.height;

      if (bgraBuffer.length != 4 * pixelWidth * pixelHeight) {
        throw new Error('Not correct bmp params');
      }

      bgraBuffer = Buffer.from(bgraBuffer);

      var bmpHeaderSize = 54;
      var bmpPixelSize = 4 * this.width * this.height;
      var bmpBufferSize = bmpHeaderSize + bmpPixelSize;

      var flag = 'BM';
      var fileSize = bmpBufferSize;
      var reserved = 0;
      var offset = bmpHeaderSize;
      // DIB header: BITMAPINFOHEADER
      var headerSize = 40;
      var width = pixelWidth;
      var height = pixelHeight;
      var planes = 1;
      var bitPP = 32;
      var compress = 0;
      var rawSize = bmpPixelSize;
      // http://www.bing.com/search?q=bmp++3780
      var hr = 3780;
      var vr = 3780;
      var colors = 0;
      var importantColors = 0;

      var bmpHeaderParams = {
        flag: flag,
        fileSize: fileSize,
        reserved: reserved,
        offset: offset,
        headerSize: headerSize,
        width: width,
        height: height,
        planes: planes,
        bitPP: bitPP,
        compress: compress,
        rawSize: rawSize,
        hr: hr,
        vr: vr,
        colors: colors,
        importantColors: importantColors
      };

      var bmpHeaderBuffer = this._setBmpHeader(bmpHeaderParams);
      var bmpPixelBuffer = BufferToNormalBmp.reverseBufferLine(bgraBuffer, width, height);
      var bmpBuffer = Buffer.concat([bmpHeaderBuffer, bmpPixelBuffer]);

      return bmpBuffer;
    }
  }, {
    key: 'to24bitBmpBuffer',
    value: function to24bitBmpBuffer(bgraBuffer, pixelWidth, pixelHeight) {
      bgraBuffer = bgraBuffer || this.bgraBuffer;
      pixelWidth = pixelWidth || this.width;
      pixelHeight = pixelHeight || this.height;

      if (bgraBuffer.length != 4 * pixelWidth * pixelHeight) {
        throw new Error('Not correct bmp params');
      }

      bgraBuffer = Buffer.from(bgraBuffer);

      var bmpHeaderSize = 54;
      var bmpPixelSize = 3 * this.width * this.height;
      var bmpBufferSize = bmpHeaderSize + bmpPixelSize;

      var flag = 'BM';
      var fileSize = bmpBufferSize;
      var reserved = 0;
      var offset = bmpHeaderSize;
      // DIB header: BITMAPINFOHEADER
      var headerSize = 40;
      var width = this.width;
      var height = this.height;
      var planes = 1;
      var bitPP = 24;
      var compress = 0;
      var rawSize = bmpPixelSize;
      // http://www.bing.com/search?q=bmp++3780
      var hr = 3780;
      var vr = 3780;
      var colors = 0;
      var importantColors = 0;

      var bmpHeaderParams = {
        flag: flag,
        fileSize: fileSize,
        reserved: reserved,
        offset: offset,
        headerSize: headerSize,
        width: width,
        height: height,
        planes: planes,
        bitPP: bitPP,
        compress: compress,
        rawSize: rawSize,
        hr: hr,
        vr: vr,
        colors: colors,
        importantColors: importantColors
      };

      var bmpHeaderBuffer = this._setBmpHeader(bmpHeaderParams);
      var bgraBuffer24 = BgraBufferBitTransform.from32To24(bgraBuffer);
      var bmpPixelBuffer = BufferToNormalBmp.reverseBufferLine(bgraBuffer24, width, height);
      var bmpBuffer = Buffer.concat([bmpHeaderBuffer, bmpPixelBuffer]);

      return bmpBuffer;
    }
  }, {
    key: 'to16bitBmpBuffer',
    value: function to16bitBmpBuffer(bgraBuffer, pixelWidth, pixelHeight) {
      bgraBuffer = bgraBuffer || this.bgraBuffer;
      pixelWidth = pixelWidth || this.width;
      pixelHeight = pixelHeight || this.height;

      if (bgraBuffer.length != 4 * pixelWidth * pixelHeight) {
        throw new Error('Not correct bmp params');
      }

      bgraBuffer = Buffer.from(bgraBuffer);
      var bmpHeaderSize = 54;
      var bmpPixelSize = 2 * this.width * this.height;
      var bmpBufferSize = bmpHeaderSize + bmpPixelSize;

      var flag = 'BM';
      var fileSize = bmpBufferSize;
      var reserved = 0;
      var offset = bmpHeaderSize;
      // DIB header: BITMAPINFOHEADER
      var headerSize = 40;
      var width = this.width;
      var height = this.height;
      var planes = 1;
      var bitPP = 16;
      var compress = 0;
      var rawSize = bmpPixelSize;
      // http://www.bing.com/search?q=bmp++3780
      var hr = 3780;
      var vr = 3780;
      var colors = 0;
      var importantColors = 0;

      var bmpHeaderParams = {
        flag: flag,
        fileSize: fileSize,
        reserved: reserved,
        offset: offset,
        headerSize: headerSize,
        width: width,
        height: height,
        planes: planes,
        bitPP: bitPP,
        compress: compress,
        rawSize: rawSize,
        hr: hr,
        vr: vr,
        colors: colors,
        importantColors: importantColors
      };

      var bmpHeaderBuffer = this._setBmpHeader(bmpHeaderParams);
      var bgraBuffer16 = BgraBufferBitTransform.from32To16(bgraBuffer);

      var bmpPixelBuffer = BufferToNormalBmp.reverseBufferLine(bgraBuffer16, width, height);
      var bmpBuffer = Buffer.concat([bmpHeaderBuffer, bmpPixelBuffer]);

      return bmpBuffer;
    }
  }, {
    key: 'clipping',
    value: function clipping(startX, startY, endX, endY) {
      var bgraBuffer = Buffer.from(this.bgraBuffer);
      var pixelByteUnit = 4;

      var bufferArr = [];
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          if (x >= startX && x < endX && y >= startY && y < endY) {
            bufferArr.push(bgraBuffer.slice((y * this.width + x) * pixelByteUnit, (y * this.width + x + 1) * pixelByteUnit));
          }
        }
      }

      return Buffer.concat(bufferArr);
    }
  }], [{
    key: 'reverseBufferLine',
    value: function reverseBufferLine(bgraBuffer, width, height) {
      bgraBuffer = Buffer.from(bgraBuffer);

      var inputPixelByte = Number.parseInt(bgraBuffer.length / width / height);

      var bufferArr = [];
      for (var i = 0; i < height; i++) {
        var oneLineBuffer = bgraBuffer.slice(inputPixelByte * width * i, inputPixelByte * width * (i + 1));
        bufferArr.push(oneLineBuffer);
      }
      bufferArr = bufferArr.reverse();

      return Buffer.concat(bufferArr);
    }
  }]);

  return BufferToNormalBmp;
}();

;

exports.BufferToNormalBmp = BufferToNormalBmp;
exports.default = BufferToNormalBmp;