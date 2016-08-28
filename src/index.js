/**
 * Created by CntChen 2016.08.24
 * 将RAGB的buffer数据转换为BMP文件
 */


import * as BgraBufferBitTransform from './bgra-buffer-bit-transform.js';

class BufferToNormalBmp {
    constructor(bgraBuffer, width, height) {
        const inputPixelBit = Number.parseInt(bgraBuffer.length / width / height * 8);
        this.bgraBuffer = (BgraBufferBitTransform['from'+inputPixelBit+'To32'] && BgraBufferBitTransform['from'+inputPixelBit+'To32'](bgraBuffer))
        || Buffer.from(bgraBuffer);
        this.width = width;
        this.height = height;
    }

    _setBmpHeader(bmpHeaderParams) {
        let {
            flag,
            fileSize,
            reserved,
            offset,
            headerSize,
            width,
            height,
            planes,
            bitPP,
            compress,
            rawSize,
            hr,
            vr,
            colors,
            importantColors
        } = bmpHeaderParams;

        const bmpHeaderSize = 54;
        let bmpHeaderBuffer = new Buffer(bmpHeaderSize);

        let pos = 0;
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
    _reverseBufferLine(bgraBuffer, width, height) {
        return bgraBuffer;
        bgraBuffer = Buffer.from(bgraBuffer);

        const inputPixelByte = Number.parseInt(bgraBuffer.length / width / height);
        console.log(inputPixelByte);

        let bufferArr = [];
        for (let i = 0; i < height; i++) {
            let oneLineBuffer = bgraBuffer.slice(inputPixelByte * width * i, inputPixelByte * width * (i + 1));
            bufferArr.push(oneLineBuffer);
        }
        bufferArr = bufferArr.reverse();

        return Buffer.concat(bufferArr);
    }

    _getBgraArr(pixelBuffer, pixelWidth, colorBitUnit) {
        pixelBuffer = Buffer.from(pixelBuffer);

        let bs = [];
        let gs = [];
        let rs = [];
        let as = [];
        for (let i = 0; i < width; i++) {
            bs.push(bgraBuffer.slice(4 * i + 0, 4 * i + 1));
            gs.push(bgraBuffer.slice(4 * i + 1, 4 * i + 2));
            rs.push(bgraBuffer.slice(4 * i + 2, 4 * i + 3));
            as.push(bgraBuffer.slice(4 * i + 3, 4 * i + 4));
        }

        let bufferArr = [];
        for (let i = 0; i < width; i++) {
            bufferArr.push(bs[i]);
            bufferArr.push(gs[i]);
            bufferArr.push(rs[i]);
            bufferArr.push(as[i]);            
        }

        return Buffer.concat(bufferArr);
    }

    to32bitBmpBuffer(bgraBuffer, pixelWidth, pixelHeight) {
        bgraBuffer = bgraBuffer || this.bgraBuffer;
        pixelWidth = pixelWidth || this.width;
        pixelHeight =  pixelHeight || this.height;

        if(bgraBuffer.length != 4 * pixelWidth * pixelHeight){
            throw new Error('Not correct bmp params');
        }

        bgraBuffer = Buffer.from(bgraBuffer);

        const bmpHeaderSize = 54;
        const bmpPixelSize = 4 * this.width * this.height;
        const bmpBufferSize = bmpHeaderSize + bmpPixelSize;

        const flag = 'BM';
        const fileSize = bmpBufferSize;
        const reserved = 0;
        const offset = bmpHeaderSize;
        // DIB header: BITMAPINFOHEADER
        const headerSize = 40;
        const width = pixelWidth;
        const height = pixelHeight;
        const planes = 1;
        const bitPP = 32;
        const compress = 0;
        const rawSize = bmpPixelSize;
        // http://www.bing.com/search?q=bmp++3780
        const hr = 3780;
        const vr = 3780;
        const colors = 0;
        const importantColors = 0;

        const bmpHeaderParams = {
            flag,
            fileSize,
            reserved,
            offset,
            headerSize,
            width,
            height,
            planes,
            bitPP,
            compress,
            rawSize,
            hr,
            vr,
            colors,
            importantColors,
        };

        const bmpHeaderBuffer = this._setBmpHeader(bmpHeaderParams);
        const bmpPixelBuffer = this._reverseBufferLine(bgraBuffer, width, height);
        const bmpBuffer = Buffer.concat([bmpHeaderBuffer, bmpPixelBuffer]);

        return bmpBuffer;
    };

    to24bitBmpBuffer(bgraBuffer, pixelWidth, pixelHeight) {
        bgraBuffer = bgraBuffer || this.bgraBuffer;
        pixelWidth = pixelWidth || this.width;
        pixelHeight =  pixelHeight || this.height;

        if(bgraBuffer.length != 4 * pixelWidth * pixelHeight){
            throw new Error('Not correct bmp params');
        }

        bgraBuffer = Buffer.from(bgraBuffer);

        const bmpHeaderSize = 54;
        const bmpPixelSize = 3 * this.width * this.height;
        const bmpBufferSize = bmpHeaderSize + bmpPixelSize;

        const flag = 'BM';
        const fileSize = bmpBufferSize;
        const reserved = 0;
        const offset = bmpHeaderSize;
        // DIB header: BITMAPINFOHEADER
        const headerSize = 40;
        const width = this.width;
        const height = this.height;
        const planes = 1;
        const bitPP = 24;
        const compress = 0;
        const rawSize = bmpPixelSize;
        // http://www.bing.com/search?q=bmp++3780
        const hr = 3780;
        const vr = 3780;
        const colors = 0;
        const importantColors = 0;

        const bmpHeaderParams = {
            flag,
            fileSize,
            reserved,
            offset,
            headerSize,
            width,
            height,
            planes,
            bitPP,
            compress,
            rawSize,
            hr,
            vr,
            colors,
            importantColors,
        };

        const bmpHeaderBuffer = this._setBmpHeader(bmpHeaderParams);
        const bgraBuffer24 = BgraBufferBitTransform.from32To24(bgraBuffer);
        const bmpPixelBuffer = this._reverseBufferLine(bgraBuffer24, width, height);
        const bmpBuffer = Buffer.concat([bmpHeaderBuffer, bmpPixelBuffer]);

        return bmpBuffer;
    };

    to16bitBmpBuffer(bgraBuffer, pixelWidth, pixelHeight) {
        bgraBuffer = bgraBuffer || this.bgraBuffer;
        pixelWidth = pixelWidth || this.width;
        pixelHeight =  pixelHeight || this.height;

        if(bgraBuffer.length != 4 * pixelWidth * pixelHeight){
            throw new Error('Not correct bmp params');
        }

        bgraBuffer = Buffer.from(bgraBuffer);
        const bmpHeaderSize = 54;
        const bmpPixelSize = 2 * this.width * this.height;
        const bmpBufferSize = bmpHeaderSize + bmpPixelSize;

        const flag = 'BM';
        const fileSize = bmpBufferSize;
        const reserved = 0;
        const offset = bmpHeaderSize;
        // DIB header: BITMAPINFOHEADER
        const headerSize = 40;
        const width = this.width;
        const height = this.height;
        const planes = 1;
        const bitPP = 16;
        const compress = 0;
        const rawSize = bmpPixelSize;
        // http://www.bing.com/search?q=bmp++3780
        const hr = 3780;
        const vr = 3780;
        const colors = 0;
        const importantColors = 0;

        const bmpHeaderParams = {
            flag,
            fileSize,
            reserved,
            offset,
            headerSize,
            width,
            height,
            planes,
            bitPP,
            compress,
            rawSize,
            hr,
            vr,
            colors,
            importantColors,
        };

        const bmpHeaderBuffer = this._setBmpHeader(bmpHeaderParams);
        const bgraBuffer16 = BgraBufferBitTransform.from32To16(bgraBuffer);

        console.log(this._reverseBufferLine(bgraBuffer, width, height));
        console.log(this._reverseBufferLine(bgraBuffer16, width, height));
        
        const bmpPixelBuffer = this._reverseBufferLine(bgraBuffer16, width, height);
        const bmpBuffer = Buffer.concat([bmpHeaderBuffer, bmpPixelBuffer]);

        return bmpBuffer;
    };

    clipping(startX, startY, endX, endY) {
        const bgraBuffer = Buffer.from(this.bgraBuffer);
        const pixelByteUnit = 4;

        let bufferArr = [];
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (x >= startX && x < endX && y >= startY && y < endY) {
                    bufferArr.push(bgraBuffer.slice((y * this.width + x) * pixelByteUnit, (y * this.width + x + 1) * pixelByteUnit));
                }
            }
        }

        console.log(bufferArr.length);
        console.log(Buffer.concat(bufferArr).length);
        return Buffer.concat(bufferArr);
    }
};


export default BufferToNormalBmp;