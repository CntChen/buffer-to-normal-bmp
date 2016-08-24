'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by CntChen 2016.08.24
 * 将RAGB的buffer数据转换为BMP文件
 */

var BufferToNormalBmp = function () {
    function BufferToNormalBmp(rgbaBuffer, width, height) {
        _classCallCheck(this, BufferToNormalBmp);

        this.rgbaBuffer = rgbaBuffer;
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
    }, {
        key: 'to32bitBmpBuffer',
        value: function to32bitBmpBuffer() {
            var bmpHeaderSize = 54;
            var bmpPixelSize = 4 * this.width * this.height;
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
            var bmpBuffer = Buffer.concat([bmpHeaderBuffer, this.rgbaBuffer]);

            return bmpBuffer;
        }
    }, {
        key: 'to24bitBmpBuffer',
        value: function to24bitBmpBuffer() {
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

            return bmpHeaderBuffer;
        }
    }, {
        key: 'to16bitBmpBuffer',
        value: function to16bitBmpBuffer() {
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

            return bmpHeaderBuffer;
        }
    }]);

    return BufferToNormalBmp;
}();

;

exports.BufferToNormalBmp = BufferToNormalBmp;