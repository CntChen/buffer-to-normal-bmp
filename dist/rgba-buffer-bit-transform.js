'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function from32To24(rgbaBuffer) {
    rgbaBuffer = Buffer.from(rgbaBuffer);
    var fromColorBitUnit = 8;
    var toColorBitUnit = 8;
    var pixelByteUnit = 4;
    var pixelWidth = Number.parseInt(rgbaBuffer.length / pixelByteUnit);

    var rs = [];
    var gs = [];
    var bs = [];
    var as = [];
    for (var i = 0; i < pixelWidth; i++) {
        rs.push(rgbaBuffer.slice(pixelByteUnit * i + 0, pixelByteUnit * i + 1));
        gs.push(rgbaBuffer.slice(pixelByteUnit * i + 1, pixelByteUnit * i + 2));
        bs.push(rgbaBuffer.slice(pixelByteUnit * i + 2, pixelByteUnit * i + 3));
        as.push(rgbaBuffer.slice(pixelByteUnit * i + 3, pixelByteUnit * i + 4));
    }

    var bufferArr = [];
    for (var _i = 0; _i < pixelWidth; _i++) {
        bufferArr.push(rs[_i]);
        bufferArr.push(gs[_i]);
        bufferArr.push(bs[_i]);
    }

    return Buffer.concat(bufferArr);
}

function from32To16(rgbaBuffer) {
    rgbaBuffer = Buffer.from(rgbaBuffer);
    var fromColorBitUnit = 8;
    var toColorBitUnit = 6;
    var pixelByteUnit = 4;
    var pixelWidth = Number.parseInt(rgbaBuffer.length / pixelByteUnit);

    var rs = [];
    var gs = [];
    var bs = [];
    var as = [];
    for (var i = 0; i < pixelWidth; i++) {
        rs.push(rgbaBuffer.slice(pixelByteUnit * i + 0, pixelByteUnit * i + 1));
        gs.push(rgbaBuffer.slice(pixelByteUnit * i + 1, pixelByteUnit * i + 2));
        bs.push(rgbaBuffer.slice(pixelByteUnit * i + 2, pixelByteUnit * i + 3));
        as.push(rgbaBuffer.slice(pixelByteUnit * i + 3, pixelByteUnit * i + 4));
    }

    var bufferArr = [];
    for (var _i2 = 0; _i2 < pixelWidth; _i2++) {
        var numR = Number.parseInt(Number.parseInt(rs[_i2].toString('hex'), 16) / 256 * 32);
        var numG = Number.parseInt(Number.parseInt(gs[_i2].toString('hex'), 16) / 256 * 64);
        var numB = Number.parseInt(Number.parseInt(bs[_i2].toString('hex'), 16) / 256 * 32);

        // console.log(pixelWidth);
        // console.log(rs,gs,bs);
        // console.log(Number.parseInt(Number.parseInt(rs[0].toString('hex'), 16) / 256 * 32));
        // console.log(Number.parseInt(Number.parseInt(gs[0].toString('hex'), 16) / 256 * 64));
        // console.log(Number.parseInt(Number.parseInt(bs[0].toString('hex'), 16) / 256 * 32));

        var firstBufer = Buffer.from('' + Number.parseInt(numR << 3 + numG >> 3));
        var secondBuffer = Buffer.from(Number.parseInt((numG << 5 + numB) % 256).toString(16));

        console.log(firstBufer, secondBuffer);

        bufferArr.push(firstBufer);
        bufferArr.push(secondBuffer);
    }

    return Buffer.concat(bufferArr);
}

function from24To32(rgbaBuffer) {
    rgbaBuffer = Buffer.from(rgbaBuffer);
    var fromColorBitUnit = 8;
    var toColorBitUnit = 8;
    var pixelByteUnit = 3;
    var pixelWidth = Number.parseInt(rgbaBuffer.length / pixelByteUnit);

    var rs = [];
    var gs = [];
    var bs = [];
    var as = [];
    for (var i = 0; i < pixelWidth; i++) {
        rs.push(rgbaBuffer.slice(pixelByteUnit * i + 0, pixelByteUnit * i + 1));
        gs.push(rgbaBuffer.slice(pixelByteUnit * i + 1, pixelByteUnit * i + 2));
        bs.push(rgbaBuffer.slice(pixelByteUnit * i + 2, pixelByteUnit * i + 3));
        as.push(Buffer.from('00', 'hex'));
    }

    var bufferArr = [];
    for (var _i3 = 0; _i3 < pixelWidth; _i3++) {
        bufferArr.push(rs[_i3]);
        bufferArr.push(gs[_i3]);
        bufferArr.push(bs[_i3]);
        bufferArr.push(as[_i3]);
    }

    return Buffer.concat(bufferArr);
}

function from16To32() {
    rgbaBuffer = Buffer.from(rgbaBuffer);
    var fromColorBitUnit = 6;
    var toColorBitUnit = 8;
    var pixelByteUnit = 2;
    var pixelWidth = Number.parseInt(rgbaBuffer.length / pixelByteUnit);

    var rs = [];
    var gs = [];
    var bs = [];
    var as = [];
    for (var i = 0; i < pixelWidth; i++) {
        var firstBufer = rgbaBuffer.slice(pixelByteUnit * i + 0, pixelByteUnit * i + 1);
        var secondBuffer = rgbaBuffer.slice(pixelByteUnit * i + 1, pixelByteUnit * i + 2);

        var numR = Number.parseInt((Number.parseInt(firstBufer) >> 3) * 256 / 32);
        var numG = Number.parseInt(Number.parseInt((Math.mod(Number.parseInt(firstBufer) << 5, 256) >> 2) + (Number.parseInt(secondBuffer) >> 5)) * 255 / 32);
        var numB = Number.parseInt((Math.mod(Number.parseInt(secondBuffer) << 3, 256) >> 3) * 255 / 32);

        rs.push(Buffer.from(numR));
        gs.push(Buffer.from(numG));
        bs.push(Buffer.from(numB));
        as.push(Buffer.from('00', 'hex'));
    }

    var bufferArr = [];
    for (var _i4 = 0; _i4 < pixelWidth; _i4++) {
        bufferArr.push(rs[_i4]);
        bufferArr.push(gs[_i4]);
        bufferArr.push(bs[_i4]);
        bufferArr.push(as[_i4]);
    }

    return Buffer.concat(bufferArr);
}

function from24To16() {}

function from16To24() {}

exports.from32To24 = from32To24;
exports.from32To16 = from32To16;
exports.from24To32 = from24To32;
exports.from16To32 = from16To32;
exports.from24To16 = from24To16;
exports.from16To24 = from16To24;