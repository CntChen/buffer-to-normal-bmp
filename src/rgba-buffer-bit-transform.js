/**
 * @author   CntChen
 * @date     2016-08-25
 * @desc     32bit 24bit 16bit rgbaBuffer transform
 */

///////////////////////
/**
 * chain operation for Str/Buf/Int
 * clear and avoid `parenthesis hell`
 * example: a(b()c()d(e(f())))   ==> `))))`
 * chained: a().b().c()d().e().f()
 * TODO: add type detection and throw error before wrong function call
 */
class StrBufInt {
    constructor(value) {
        this.value = value;
        this.type = typeof this.value;
        this.isLog = false;
    }

    toggleLog() {
        this.isLog = !this.isLog;
        if (this.isLog) {
            this._log('StrBufInt:\n');
        }
        return this;
    }

    _log() {
        if (this.isLog) {
            console.log(...arguments, this.value, this.type);
        }
    }

    _int(value) {
        return Number.parseInt(value, 10);
    }

    /**
     * string '0' use Buffer.from() will get error `TypeError: Invalid hex string`
     * so should cover hex str to even length hex str '00'
     */
    hexStrToBuf() {
        this.value = this.value.length % 2 === 0 ? this.value : '0' + this.value;
        this.value = Buffer.from(this.value, 'hex');
        this.type = typeof this.value;
        this._log();
        return this;
    }

    bufToHexStr() {
        this.value = this.value.toString('hex');
        this.type = typeof this.value;
        this._log();
        return this;
    }

    intToHexStr() {
        this.value = this.value.toString(16);
        this.type = typeof this.value;
        this._log();
        return this;
    }

    hexStrToInt() {
        this.value = Number.parseInt(this.value, 16);
        this.type = typeof this.value;
        this._log();
        return this;
    }

    intToBuf() {
        return this.intToHexStr().hexStrToBuf();
    }

    bufToInt() {
        return this.bufToHexStr().hexStrToInt();
    }

    toInt() {
        this.value = Number.parseInt(this.value, 10);
        this.type = typeof this.value;
        this._log();
        return this;
    }

    numberMod256() {
        this.value = this.value % 256;
        this.type = typeof this.value;
        return this;
    }

    digit8To5() {
        this.value = this._int(this.value / 256 * 32);
        this.type = typeof this.value;
        this._log();
        return this;
    }

    digit8To6() {
        this.value = this._int(this.value / 256 * 64);
        this.type = typeof this.value;
        this._log();
        return this;
    }

    digit5To8() {
        this.value = this._int(this.value * 256 / 32);
        this.type = typeof this.value;
        this._log();
        return this;
    }

    digit6To8() {
        this.value = this._int(this.value * 256 / 64);
        this.type = typeof this.value;
        this._log();
        return this;
    }

    /**
     * <<
     */
    bitShiftleft(bitCnt) {
        this.value = this.value << bitCnt;
        this.type = typeof this.value;
        this._log();
        return this;
    }

    /**
     * >>
     */
    bitShiftRight(bitCnt) {
        this.value = this.value >> bitCnt;
        this.type = typeof this.value;
        this._log();
        return this;
    }

    done() {
        return this.value;
    }
}
///////////////////////


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

        let numR = new StrBufInt(rs[i]).bufToInt().digit8To5().toInt().numberMod256().done();
        let numG = new StrBufInt(gs[i]).bufToInt().digit8To6().toInt().numberMod256().done();
        let numB = new StrBufInt(bs[i]).bufToInt().digit8To5().toInt().numberMod256().done();

        let firstBufer = new StrBufInt((numR << 3) + (numG >> 3)).numberMod256().intToBuf().done();
        let secondBuffer = new StrBufInt((numG << 5) + numB).numberMod256().intToBuf().done();

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

function from16To32(rgbaBuffer) {
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

        let numR = new StrBufInt(firstBufer).bufToInt().bitShiftRight(3).digit5To8().numberMod256().done();
        let numG = new StrBufInt(
                new StrBufInt(firstBufer).bufToInt().bitShiftleft(5).numberMod256().bitShiftRight(2).done() +
                new StrBufInt(secondBuffer).bufToInt().bitShiftRight(5).done()
            )
            .digit6To8().numberMod256().done();
        let numB = new StrBufInt(secondBuffer).bufToInt().bitShiftleft(3).numberMod256().digit5To8().numberMod256().done();

        rs.push(new StrBufInt(numR).intToBuf().done());
        gs.push(new StrBufInt(numG).intToBuf().done());
        bs.push(new StrBufInt(numB).intToBuf().done());
        as.push(new StrBufInt('00').hexStrToBuf().done());
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

/**
 * easy to understand and write
 * no high efficiency
 */
function from24To16(rgbaBuffer) {
    rgbaBuffer = Buffer.from(rgbaBuffer);
    rgbaBuffer = from24To32(rgbaBuffer);
    rgbaBuffer = from32To16(rgbaBuffer);

    return rgbaBuffer;
}

/**
 * easy to understand and write
 * no high efficiency
 */
function from16To24(rgbaBuffer) {
    rgbaBuffer = Buffer.from(rgbaBuffer);
    rgbaBuffer = from16To32(rgbaBuffer);
    rgbaBuffer = from16To24(rgbaBuffer);

    return rgbaBuffer;
}


const RgabBufferBitTransform = {
    from32To24,
    from32To16,
    from24To32,
    from16To32,
    from24To16,
    from16To24,
};

export {
    RgabBufferBitTransform
};