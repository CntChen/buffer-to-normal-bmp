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

    to32bitBmpBuffer() {
        const bmpHeaderSize = 54;
        const bmpPixelSize = 4 * this.width * this.height;
        const bmpBufferSize = bmpHeaderSize + bmpPixelSize;

        let bmpHeaderBuffer = new Buffer(bmpHeaderSize);
        let pos = 0;
        
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
    };

    to24bitBmpBuffer() {
        const bmpHeaderSize = 54;
        const bmpPixelSize = 3 * this.width * this.height;
        const bmpBufferSize = bmpHeaderSize + bmpPixelSize;

        let bmpHeaderBuffer = new Buffer(bmpHeaderSize);
        let pos = 0;
        
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
    };

    to16bitBmpBuffer() {
        const bmpHeaderSize = 54;
        const bmpPixelSize = 2 * this.width * this.height;
        const bmpBufferSize = bmpHeaderSize + bmpPixelSize;

        let bmpHeaderBuffer = new Buffer(bmpHeaderSize);
        let pos = 0;
        
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
    };
};

export {BufferToNormalBmp};