
function from32To24(rgbaBuffer) {
    rgbaBuffer = Buffer.from(rgbaBuffer);
    const fromColorBitUnit = 8;
    const toColorBitUnit = 8;
    const pixelByteUnit = 4;
    const pixelWidth = Number.parseInt(rgbaBuffer.length / pixelByteUnit);

    let rs = [];
    let gs = [];
    let bs = [];
    let as = [];
    for (let i = 0; i < pixelWidth; i++) {
        rs.push(rgbaBuffer.slice(pixelByteUnit * i + 0, pixelByteUnit * i + 1));
        gs.push(rgbaBuffer.slice(pixelByteUnit * i + 1, pixelByteUnit * i + 2));
        bs.push(rgbaBuffer.slice(pixelByteUnit * i + 2, pixelByteUnit * i + 3));
        as.push(rgbaBuffer.slice(pixelByteUnit * i + 3, pixelByteUnit * i + 4));
    }

    let bufferArr = [];
    for (let i = 0; i < pixelWidth; i++) {
        bufferArr.push(rs[i]);
        bufferArr.push(gs[i]);
        bufferArr.push(bs[i]);
    }

    return Buffer.concat(bufferArr);
}

function from32To16(rgbaBuffer) {
    rgbaBuffer = Buffer.from(rgbaBuffer);
    const fromColorBitUnit = 8;
    const toColorBitUnit = 6;
    const pixelByteUnit = 4;
    const pixelWidth = Number.parseInt(rgbaBuffer.length / pixelByteUnit);

    let rs = [];
    let gs = [];
    let bs = [];
    let as = [];
    for (let i = 0; i < pixelWidth; i++) {
        rs.push(rgbaBuffer.slice(pixelByteUnit * i + 0, pixelByteUnit * i + 1));
        gs.push(rgbaBuffer.slice(pixelByteUnit * i + 1, pixelByteUnit * i + 2));
        bs.push(rgbaBuffer.slice(pixelByteUnit * i + 2, pixelByteUnit * i + 3));
        as.push(rgbaBuffer.slice(pixelByteUnit * i + 3, pixelByteUnit * i + 4));
    }

    let bufferArr = [];
    for (let i = 0; i < pixelWidth; i++) {
        let numR = Number.parseInt(Number.parseInt(rs[i].toString('hex'), 16) / 256 * 32);
        let numG = Number.parseInt(Number.parseInt(gs[i].toString('hex'), 16) / 256 * 64);
        let numB = Number.parseInt(Number.parseInt(bs[i].toString('hex'), 16) / 256 * 32);

    // console.log(pixelWidth);
    // console.log(rs,gs,bs);
    // console.log(Number.parseInt(Number.parseInt(rs[0].toString('hex'), 16) / 256 * 32));
    // console.log(Number.parseInt(Number.parseInt(gs[0].toString('hex'), 16) / 256 * 64));
    // console.log(Number.parseInt(Number.parseInt(bs[0].toString('hex'), 16) / 256 * 32));
    
    

        let firstBufer = Buffer.from(''+Number.parseInt(numR << 3 + numG >> 3));
        let secondBuffer = Buffer.from(Number.parseInt((numG << 5 + numB) % 256).toString(16));

            console.log(firstBufer,secondBuffer);

        bufferArr.push(firstBufer);
        bufferArr.push(secondBuffer);
    }

    return Buffer.concat(bufferArr);
}

function from24To32(rgbaBuffer) {
    rgbaBuffer = Buffer.from(rgbaBuffer);
    const fromColorBitUnit = 8;
    const toColorBitUnit = 8;
    const pixelByteUnit = 3;
    const pixelWidth = Number.parseInt(rgbaBuffer.length / pixelByteUnit);

    let rs = [];
    let gs = [];
    let bs = [];
    let as = [];
    for (let i = 0; i < pixelWidth; i++) {
        rs.push(rgbaBuffer.slice(pixelByteUnit * i + 0, pixelByteUnit * i + 1));
        gs.push(rgbaBuffer.slice(pixelByteUnit * i + 1, pixelByteUnit * i + 2));
        bs.push(rgbaBuffer.slice(pixelByteUnit * i + 2, pixelByteUnit * i + 3));
        as.push(Buffer.from('00', 'hex'));
    }

    let bufferArr = [];
    for (let i = 0; i < pixelWidth; i++) {
        bufferArr.push(rs[i]);
        bufferArr.push(gs[i]);
        bufferArr.push(bs[i]);
        bufferArr.push(as[i]);
    }

    return Buffer.concat(bufferArr);
}

function from16To32() {
    rgbaBuffer = Buffer.from(rgbaBuffer);
    const fromColorBitUnit = 6;
    const toColorBitUnit = 8;
    const pixelByteUnit = 2;
    const pixelWidth = Number.parseInt(rgbaBuffer.length / pixelByteUnit);

    let rs = [];
    let gs = [];
    let bs = [];
    let as = [];
    for (let i = 0; i < pixelWidth; i++) {
        let firstBufer = rgbaBuffer.slice(pixelByteUnit * i + 0, pixelByteUnit * i + 1);
        let secondBuffer = rgbaBuffer.slice(pixelByteUnit * i + 1, pixelByteUnit * i + 2);

        let numR = Number.parseInt((Number.parseInt(firstBufer) >> 3) * 256 / 32);
        let numG = Number.parseInt((Number.parseInt((Math.mod(Number.parseInt(firstBufer) << 5, 256) >> 2) + (Number.parseInt(secondBuffer) >> 5))) * 255 / 32);
        let numB = Number.parseInt((Math.mod(Number.parseInt(secondBuffer) << 3, 256) >> 3) * 255 / 32);

        rs.push(Buffer.from(numR));
        gs.push(Buffer.from(numG));
        bs.push(Buffer.from(numB));
        as.push(Buffer.from('00', 'hex'));
    }

    let bufferArr = [];
    for (let i = 0; i < pixelWidth; i++) {
        bufferArr.push(rs[i]);
        bufferArr.push(gs[i]);
        bufferArr.push(bs[i]);
        bufferArr.push(as[i]);
    }

    return Buffer.concat(bufferArr);
}

function from24To16() { }

function from16To24() { }


export {
    from32To24,
    from32To16,
    from24To32,
    from16To32,
    from24To16,
    from16To24,
};