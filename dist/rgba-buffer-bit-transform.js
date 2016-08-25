'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var StrBufInt = function () {
    function StrBufInt(value) {
        _classCallCheck(this, StrBufInt);

        this.value = value;
        this.type = _typeof(this.value);
        this.isLog = false;
    }

    _createClass(StrBufInt, [{
        key: 'toggleLog',
        value: function toggleLog() {
            this.isLog = !this.isLog;
            if (this.isLog) {
                this._log('StrBufInt:\n');
            }
            return this;
        }
    }, {
        key: '_log',
        value: function _log() {
            if (this.isLog) {
                var _console;

                (_console = console).log.apply(_console, Array.prototype.slice.call(arguments).concat([this.value, this.type]));
            }
        }
    }, {
        key: '_int',
        value: function _int(value) {
            return Number.parseInt(value, 10);
        }

        /**
         * string '0' use Buffer.from() will get error `TypeError: Invalid hex string`
         * so should cover hex str to even length hex str '00'
         */

    }, {
        key: 'hexStrToBuf',
        value: function hexStrToBuf() {
            this.value = this.value.length % 2 === 0 ? this.value : '0' + this.value;
            this.value = Buffer.from(this.value, 'hex');
            this.type = _typeof(this.value);
            this._log();
            return this;
        }
    }, {
        key: 'bufToHexStr',
        value: function bufToHexStr() {
            this.value = this.value.toString('hex');
            this.type = _typeof(this.value);
            this._log();
            return this;
        }
    }, {
        key: 'intToHexStr',
        value: function intToHexStr() {
            this.value = this.value.toString(16);
            this.type = _typeof(this.value);
            this._log();
            return this;
        }
    }, {
        key: 'hexStrToInt',
        value: function hexStrToInt() {
            this.value = Number.parseInt(this.value, 16);
            this.type = _typeof(this.value);
            this._log();
            return this;
        }
    }, {
        key: 'intToBuf',
        value: function intToBuf() {
            return this.intToHexStr().hexStrToBuf();
        }
    }, {
        key: 'bufToInt',
        value: function bufToInt() {
            return this.bufToHexStr().hexStrToInt();
        }
    }, {
        key: 'toInt',
        value: function toInt() {
            this.value = Number.parseInt(this.value, 10);
            this.type = _typeof(this.value);
            this._log();
            return this;
        }
    }, {
        key: 'numberMod256',
        value: function numberMod256() {
            this.value = this.value % 256;
            this.type = _typeof(this.value);
            return this;
        }
    }, {
        key: 'digit8To5',
        value: function digit8To5() {
            this.value = this._int(this.value / 256 * 32);
            this.type = _typeof(this.value);
            this._log();
            return this;
        }
    }, {
        key: 'digit8To6',
        value: function digit8To6() {
            this.value = this._int(this.value / 256 * 64);
            this.type = _typeof(this.value);
            this._log();
            return this;
        }
    }, {
        key: 'digit5To8',
        value: function digit5To8() {
            this.value = this._int(this.value * 256 / 32);
            this.type = _typeof(this.value);
            this._log();
            return this;
        }
    }, {
        key: 'digit6To8',
        value: function digit6To8() {
            this.value = this._int(this.value * 256 / 64);
            this.type = _typeof(this.value);
            this._log();
            return this;
        }

        /**
         * <<
         */

    }, {
        key: 'bitShiftleft',
        value: function bitShiftleft(bitCnt) {
            this.value = this.value << bitCnt;
            this.type = _typeof(this.value);
            this._log();
            return this;
        }

        /**
         * >>
         */

    }, {
        key: 'bitShiftRight',
        value: function bitShiftRight(bitCnt) {
            this.value = this.value >> bitCnt;
            this.type = _typeof(this.value);
            this._log();
            return this;
        }
    }, {
        key: 'done',
        value: function done() {
            return this.value;
        }
    }]);

    return StrBufInt;
}();
///////////////////////

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

        var numR = new StrBufInt(rs[_i2]).bufToInt().digit8To5().toInt().numberMod256().done();
        var numG = new StrBufInt(gs[_i2]).bufToInt().digit8To6().toInt().numberMod256().done();
        var numB = new StrBufInt(bs[_i2]).bufToInt().digit8To5().toInt().numberMod256().done();

        var firstBufer = new StrBufInt((numR << 3) + (numG >> 3)).numberMod256().intToBuf().done();
        var secondBuffer = new StrBufInt((numG << 5) + numB).numberMod256().intToBuf().done();

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

function from16To32(rgbaBuffer) {
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

        var numR = new StrBufInt(firstBufer).bufToInt().bitShiftRight(3).digit5To8().numberMod256().done();
        var numG = new StrBufInt(new StrBufInt(firstBufer).bufToInt().bitShiftleft(5).numberMod256().bitShiftRight(2).done() + new StrBufInt(secondBuffer).bufToInt().bitShiftRight(5).done()).digit6To8().numberMod256().done();
        var numB = new StrBufInt(secondBuffer).bufToInt().bitShiftleft(3).numberMod256().digit5To8().numberMod256().done();

        rs.push(new StrBufInt(numR).intToBuf().done());
        gs.push(new StrBufInt(numG).intToBuf().done());
        bs.push(new StrBufInt(numB).intToBuf().done());
        as.push(new StrBufInt('00').hexStrToBuf().done());
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

exports.from32To24 = from32To24;
exports.from32To16 = from32To16;
exports.from24To32 = from24To32;
exports.from16To32 = from16To32;
exports.from24To16 = from24To16;
exports.from16To24 = from16To24;