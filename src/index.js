/**
 * Created by CntChen 2016.08.24
 * 将RAGB的buffer数据转换为BMP文件
 */

class BufferToNormalBmp {
    constructor(rgbaBuffer, width, height) {
        this.rgbaBuffer = rgbaBuffer;
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
    _reverseBufferLine(rgbaBuffer, width, height) {
        rgbaBuffer = Buffer.from(rgbaBuffer);

        let bufferArr = [];
        for (let i = 0; i < height; i++) {
            let oneLineBuffer = rgbaBuffer.slice(4 * width * i, 4 * width * (i + 1));
            bufferArr.push(oneLineBuffer);
        }
        bufferArr = bufferArr.reverse();

        return Buffer.concat(bufferArr);
    }

    _getRgbaArr(pixelBuffer, pixelWidth, colorBitUnit) {
        pixelBuffer = Buffer.from(pixelBuffer);

        let rs = [];
        let gs = [];
        let bs = [];
        let as = [];
        for (let i = 0; i < width; i++) {
            rs.push(rgbaBuffer.slice(4 * i + 0, 4 * i + 1));
            gs.push(rgbaBuffer.slice(4 * i + 1, 4 * i + 2));
            bs.push(rgbaBuffer.slice(4 * i + 2, 4 * i + 3));
            as.push(rgbaBuffer.slice(4 * i + 3, 4 * i + 4));
        }

        let bufferArr = [];
        for (let i = 0; i < width; i++) {
            bufferArr.push(rs[i]);
            bufferArr.push(gs[i]);
            bufferArr.push(bs[i]);
            bufferArr.push(as[i]);            
        }

        return Buffer.concat(bufferArr);
    }

    to32bitBmpBuffer(rgbaBuffer, pixelWidth, pixelHeight) {
        rgbaBuffer = rgbaBuffer || this.rgbaBuffer;
        pixelWidth = pixelWidth || this.width;
        pixelHeight =  pixelHeight || this.height;

        if(rgbaBuffer.length != 4 * pixelWidth * pixelHeight){
            throw new Error('Not correct bmp params');
        }

        rgbaBuffer = Buffer.from(rgbaBuffer);

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
        const bmpPixelBuffer = this._reverseBufferLine(rgbaBuffer, width, height);
        const bmpBuffer = Buffer.concat([bmpHeaderBuffer, bmpPixelBuffer]);

        return bmpBuffer;
    };

    to24bitBmpBuffer(rgbaBuffer, pixelWidth, pixelHeight) {
        rgbaBuffer = rgbaBuffer || this.rgbaBuffer;
        pixelWidth = pixelWidth || this.width;
        pixelHeight =  pixelHeight || this.height;

        if(rgbaBuffer.length != 4 * pixelWidth * pixelHeight){
            throw new Error('Not correct bmp params');
        }

        rgbaBuffer = Buffer.from(rgbaBuffer);

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
        const compress = 3;
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
        
        return bmpHeaderBuffer;
    };

    to16bitBmpBuffer(rgbaBuffer, pixelWidth, pixelHeight) {
        rgbaBuffer = rgbaBuffer || this.rgbaBuffer;
        pixelWidth = pixelWidth || this.width;
        pixelHeight =  pixelHeight || this.height;

        if(rgbaBuffer.length != 4 * pixelWidth * pixelHeight){
            throw new Error('Not correct bmp params');
        }

        rgbaBuffer = Buffer.from(rgbaBuffer);
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

        return bmpHeaderBuffer;
    };
};


export {
    BufferToNormalBmp
};