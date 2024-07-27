var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/boards.ts
var boards_exports = {};
__export(boards_exports, {
  boards: () => boards,
  getBoard: () => getBoard
});
var boards = [
  {
    name: "uno",
    baud: 115200,
    signature: [30, 149, 15],
    pageSize: 128,
    numPages: 256,
    timeout: 400,
    productId: ["0x0043", "0x7523", "0x0001", "0xea60"],
    productPage: "https://store.arduino.cc/arduino-uno-rev3",
    protocol: "stk500v1"
  },
  {
    name: "micro",
    baud: 57600,
    signature: [67, 65, 84, 69, 82, 73, 78],
    productId: ["0x0037", "0x8037", "0x0036", "0x0237"],
    productPage: "https://store.arduino.cc/arduino-micro",
    protocol: "avr109"
  },
  {
    name: "imuduino",
    baud: 57600,
    signature: [67, 65, 84, 69, 82, 73, 78],
    productId: ["0x0036", "0x8037", "0x8036"],
    productPage: "https://www.kickstarter.com/projects/1265095814/imuduino-wireless-3d-motion-html-js-apps-arduino-p?lang=de",
    protocol: "avr109"
  },
  {
    name: "leonardo",
    baud: 57600,
    signature: [67, 65, 84, 69, 82, 73, 78],
    productId: ["0x0036", "0x8036", "0x800c"],
    productPage: "https://store.arduino.cc/leonardo",
    protocol: "avr109"
  },
  {
    name: "arduboy",
    baud: 57600,
    signature: [67, 65, 84, 69, 82, 73, 78],
    productId: ["0x0036", "0x8036", "0x800c"],
    productPage: "https://arduboy.com/",
    protocol: "avr109"
  },
  {
    name: "feather",
    baud: 57600,
    signature: [67, 65, 84, 69, 82, 73, 78],
    productId: ["0x800c", "0x000c"],
    productPage: "https://www.adafruit.com/feather",
    protocol: "avr109"
  },
  {
    name: "little-bits",
    baud: 57600,
    signature: [67, 65, 84, 69, 82, 73, 78],
    productId: ["0x0036", "0x8036"],
    productPage: "https://littlebits.com/collections/bits-and-accessories/products/arduino-bit",
    protocol: "avr109"
  },
  {
    name: "blend-micro",
    baud: 57600,
    signature: [67, 65, 84, 69, 82, 73, 78],
    productId: ["0x2404"],
    productPage: "https://redbear.cc/product/retired/blend-micro.html",
    protocol: "avr109"
  },
  {
    name: "nano",
    baud: 57600,
    signature: [30, 149, 15],
    pageSize: 128,
    numPages: 256,
    timeout: 400,
    productId: ["0x6001", "0x7523"],
    productPage: "https://web.archive.org/web/20150813095112/https://www.arduino.cc/en/Main/ArduinoBoardNano",
    protocol: "stk500v1"
  },
  {
    name: "nano (new bootloader)",
    baud: 115200,
    signature: [30, 149, 15],
    pageSize: 128,
    numPages: 256,
    timeout: 400,
    productId: ["0x6001", "0x7523"],
    productPage: "https://store.arduino.cc/arduino-nano",
    protocol: "stk500v1"
  },
  {
    name: "duemilanove168",
    baud: 19200,
    signature: [30, 148, 6],
    pageSize: 128,
    numPages: 128,
    timeout: 400,
    productId: ["0x6001"],
    productPage: "https://www.arduino.cc/en/Main/arduinoBoardDuemilanove",
    protocol: "stk500v1"
  },
  {
    name: "duemilanove328",
    baud: 57600,
    signature: [30, 149, 20],
    pageSize: 128,
    numPages: 256,
    timeout: 400,
    productId: ["0x6001"],
    productPage: "https://www.arduino.cc/en/Main/arduinoBoardDuemilanove",
    protocol: "stk500v1"
  },
  // the alias is here because of an accidental naming change of the tinyduino
  // keeping in for backwards compatibility (SHA 05d65842)
  {
    name: "tinyduino",
    baud: 57600,
    signature: [30, 149, 15],
    pageSize: 128,
    numPages: 256,
    timeout: 400,
    productId: ["0x6015"],
    productPage: "https://tinycircuits.com/pages/tinyduino-overview",
    protocol: "stk500v1",
    aliases: ["tinduino"]
  },
  {
    name: "mega",
    baud: 115200,
    signature: [30, 152, 1],
    // ATmega2560
    pageSize: 256,
    delay1: 10,
    delay2: 1,
    timeout: 200,
    stabDelay: 100,
    cmdexeDelay: 25,
    synchLoops: 32,
    byteDelay: 0,
    pollValue: 83,
    pollIndex: 3,
    productId: ["0x0042", "0x6001", "0x0010", "0x7523"],
    productPage: "https://store.arduino.cc/mega-2560-r3",
    protocol: "stk500v2"
  },
  {
    name: "adk",
    baud: 115200,
    signature: [30, 152, 1],
    // ATmega2560
    pageSize: 256,
    delay1: 10,
    delay2: 1,
    timeout: 200,
    stabDelay: 100,
    cmdexeDelay: 25,
    synchLoops: 32,
    byteDelay: 0,
    pollValue: 83,
    pollIndex: 3,
    productId: ["0x0044", "0x6001", "0x003F"],
    productPage: "https://store.arduino.cc/arduino-mega-adk-rev3",
    protocol: "stk500v2"
  },
  {
    name: "sf-pro-micro",
    baud: 57600,
    signature: [67, 65, 84, 69, 82, 73, 78],
    productId: ["0x9206", "0x9205"],
    productPage: "https://www.sparkfun.com/products/12640",
    protocol: "avr109"
  },
  {
    name: "pro-mini",
    baud: 57600,
    signature: [30, 149, 15],
    pageSize: 128,
    numPages: 256,
    timeout: 400,
    productPage: "https://store.arduino.cc/arduino-pro-mini",
    protocol: "stk500v1"
  },
  {
    name: "qduino",
    baud: 57600,
    signature: [67, 65, 84, 69, 82, 73, 78],
    productId: ["0x516d", "0x514d"],
    productPage: "https://www.sparkfun.com/products/13614",
    protocol: "avr109"
  },
  {
    name: "pinoccio",
    baud: 115200,
    signature: [30, 168, 2],
    // ATmega256RFR2
    pageSize: 256,
    delay1: 10,
    delay2: 1,
    timeout: 200,
    stabDelay: 100,
    cmdexeDelay: 25,
    synchLoops: 32,
    byteDelay: 0,
    pollValue: 83,
    pollIndex: 3,
    productId: ["0x6051"],
    productPage: "https://www.mouser.de/new/crowd-supply/crowd-supply-pinoccio-microcontroller/",
    protocol: "stk500v2"
  },
  {
    name: "lilypad-usb",
    baud: 57600,
    signature: [67, 65, 84, 69, 82, 73, 78],
    productId: ["0x9207", "0x9208", "0x1B4F"],
    productPage: "https://www.sparkfun.com/products/12049",
    protocol: "avr109"
  },
  {
    name: "yun",
    baud: 57600,
    signature: [67, 65, 84, 69, 82, 73, 78],
    productId: ["0x0041", "0x8041"],
    productPage: "https://store.arduino.cc/arduino-yun",
    protocol: "avr109"
  },
  {
    name: "esplora",
    baud: 57600,
    signature: [67, 65, 84, 69, 82, 73, 78],
    productId: ["0x003C", "0x803C"],
    productPage: "https://store.arduino.cc/arduino-esplora",
    protocol: "avr109"
  },
  {
    name: "circuit-playground-classic",
    baud: 57600,
    signature: [67, 65, 84, 69, 82, 73, 78],
    productId: ["0x0011", "0x8011"],
    productPage: "https://www.adafruit.com/product/3000",
    protocol: "avr109"
  },
  /** BQ - Arduino Based Boards. Used in Bitbloq -> bitbloq.bq.com and Arduino IDE*/
  {
    name: "zumjunior",
    baud: 115200,
    signature: [30, 149, 15],
    pageSize: 128,
    numPages: 256,
    timeout: 400,
    productId: ["0xEA60"],
    productPage: "https://store-de.bq.com/de/zum-kit-junior",
    protocol: "stk500v1"
  },
  {
    name: "zumcore2",
    baud: 115200,
    signature: [30, 149, 15],
    pageSize: 128,
    numPages: 256,
    timeout: 400,
    productId: ["0xEA60"],
    productPage: "https://www.bq.com/de/zum-core-2-0",
    protocol: "stk500v1"
  },
  {
    name: "bqZum",
    baud: 19200,
    signature: [30, 149, 15],
    pageSize: 128,
    numPages: 256,
    timeout: 400,
    productId: ["0x6001", "0x7523"],
    productPage: "http://diwo.bq.com/zum-bt-328-especificaciones-tecnicas/",
    protocol: "stk500v1"
  },
  /** END OF BQ - Arduino Based Boards. Used in Bitbloq -> bitbloq.bq.com and Arduino IDE*/
  /** START OF Spark Concepts Boards - Arduino Based CNC Controller but uses Atmega328pb (Note 'pb' not 'p' = different signature) https://github.com/Spark-Concepts/xPro-V4 */
  {
    name: "xprov4",
    baud: 115200,
    signature: [30, 149, 22],
    pageSize: 128,
    numPages: 256,
    timeout: 400,
    productId: ["0x0043", "0x7523", "0x0001", "0xea60"],
    productPage: "http://www.spark-concepts.com/cnc-xpro-v4-controller/",
    protocol: "stk500v1"
  }
];
var getBoard = (name) => {
  const filtered = boards.filter((b) => b.name === name || b.aliases && b.aliases.indexOf(name) !== -1);
  if (!filtered || filtered.length === 0) {
    throw new Error(`no board named '${name}' was found!`);
  }
  if (filtered.length > 1) {
    throw new Error(`several boards named '${name}' were found!`);
  }
  return filtered[0];
};

// src/hex-parser.ts
var DATA = 0;
var END_OF_FILE = 1;
var EXT_SEGMENT_ADDR = 2;
var START_SEGMENT_ADDR = 3;
var EXT_LINEAR_ADDR = 4;
var START_LINEAR_ADDR = 5;
var EMPTY_VALUE = 255;
var parseIntelHex = (data_u8, bufferSize) => {
  let data;
  data = new TextDecoder().decode(data_u8);
  let buf = new Uint8Array(bufferSize || 8192), bufLength = 0, highAddress = 0, startSegmentAddress = null, startLinearAddress = null, lineNum = 0, pos = 0;
  const SMALLEST_LINE = 11;
  while (pos + SMALLEST_LINE <= data.length) {
    if (data.charAt(pos++) !== ":") {
      throw new Error(`Line ${lineNum + 1} does not start with a colon (:).`);
    } else {
      lineNum++;
    }
    const dataLength = parseInt(data.substr(pos, 2), 16);
    pos += 2;
    const lowAddress = parseInt(data.substr(pos, 4), 16);
    pos += 4;
    const recordType = parseInt(data.substr(pos, 2), 16);
    pos += 2;
    const dataField = data.substr(pos, dataLength * 2);
    const dataFieldBuf = new Uint8Array(dataLength);
    for (let i = 0; i < dataLength; i++) {
      dataFieldBuf[i] = parseInt(dataField.substr(i * 2, 2), 16);
    }
    pos += dataLength * 2;
    const checksum = parseInt(data.substr(pos, 2), 16);
    pos += 2;
    let calcChecksum = dataLength + (lowAddress >> 8) + lowAddress + recordType & 255;
    for (let i = 0; i < dataLength; i++) {
      calcChecksum = calcChecksum + dataFieldBuf[i] & 255;
    }
    calcChecksum = 256 - calcChecksum & 255;
    if (checksum !== calcChecksum) {
      throw new Error(
        `Invalid checksum on line ${lineNum}: got ${checksum}, but expected ${calcChecksum}`
      );
    }
    switch (recordType) {
      case DATA:
        const absoluteAddress = highAddress + lowAddress;
        if (absoluteAddress + dataLength >= buf.length) {
          let tmp = new Uint8Array((absoluteAddress + dataLength) * 2);
          tmp.set(buf);
          buf = tmp;
        }
        if (absoluteAddress > bufLength) {
          buf.fill(EMPTY_VALUE, bufLength, absoluteAddress);
        }
        buf.set(dataFieldBuf, absoluteAddress);
        bufLength = Math.max(bufLength, absoluteAddress + dataLength);
        break;
      case END_OF_FILE:
        if (dataLength !== 0) {
          throw new Error(`Invalid EOF record on line ${lineNum}.`);
        }
        return {
          data: buf.slice(0, bufLength),
          startSegmentAddress,
          startLinearAddress
        };
      case EXT_SEGMENT_ADDR:
        if (dataLength !== 2 || lowAddress !== 0) {
          throw new Error(`Invalid extended segment address record on line ${lineNum}.`);
        }
        highAddress = parseInt(dataField, 16) << 4;
        break;
      case START_SEGMENT_ADDR:
        if (dataLength !== 4 || lowAddress !== 0) {
          throw new Error(`Invalid start segment address record on line ${lineNum}.`);
        }
        startSegmentAddress = parseInt(dataField, 16);
        break;
      case EXT_LINEAR_ADDR:
        if (dataLength !== 2 || lowAddress !== 0) {
          throw new Error(`Invalid extended linear address record on line ${lineNum}.`);
        }
        highAddress = parseInt(dataField, 16) << 16;
        break;
      case START_LINEAR_ADDR:
        if (dataLength !== 4 || lowAddress !== 0) {
          throw new Error(`Invalid start linear address record on line ${lineNum}.`);
        }
        startLinearAddress = parseInt(dataField, 16);
        break;
      default:
        throw new Error(`Invalid record type (${recordType}) on line ${lineNum}.`);
    }
    if (data.charAt(pos) === "\r") {
      pos++;
    }
    if (data.charAt(pos) === "\n") {
      pos++;
    }
  }
  throw new Error(`Unexpected end of input: missing or invalid EOF record.`);
};

// src/utils.ts
var bufferEqual = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

// src/stk500v1/constants.ts
var Resp_STK_INSYNC = 20;
var Resp_STK_OK = 16;
var constants_default = {
  Cmnd_STK_GET_SYNC: 48,
  Cmnd_STK_SET_DEVICE: 66,
  Cmnd_STK_ENTER_PROGMODE: 80,
  Cmnd_STK_LOAD_ADDRESS: 85,
  Cmnd_STK_PROG_PAGE: 100,
  Cmnd_STK_LEAVE_PROGMODE: 81,
  Cmnd_STK_READ_SIGN: 117,
  Sync_CRC_EOP: 32,
  Resp_STK_OK: 16,
  Resp_STK_INSYNC: 20,
  Resp_STK_NOSYNC: 21,
  Cmnd_STK_READ_PAGE: 116,
  OK_RESPONSE: new Uint8Array([Resp_STK_INSYNC, Resp_STK_OK])
};

// src/stk500v1/stk500-io.ts
var receiveData = (reader, timeout, responseLength) => __async(void 0, null, function* () {
  const startingBytes = [constants_default.Resp_STK_INSYNC];
  let buffer = new Uint8Array(0);
  let started = false;
  let timeoutId = null;
  let isReading = false;
  let error = null;
  const finished = (err) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    isReading = false;
    error = err || null;
  };
  const handleChunk = (data) => {
    let index = 0;
    while (!started && index < data.length) {
      const byte = data[index];
      if (startingBytes.indexOf(byte) !== -1) {
        data = data.slice(index, data.length - index);
        started = true;
      }
      index++;
    }
    if (started) {
      buffer = new Uint8Array([...buffer, ...data]);
    }
    if (buffer.length > responseLength) {
      finished(new Error(`buffer overflow ${buffer.length} > ${responseLength}`));
    } else if (buffer.length === responseLength) {
      finished();
    }
  };
  if (timeout && timeout > 0) {
    timeoutId = setTimeout(() => {
      timeoutId = null;
      finished(new Error(`receiveData timeout after ${timeout}ms`));
    }, timeout);
  }
  if (reader) {
    isReading = true;
    while (isReading) {
      try {
        const { value, done } = yield reader.read();
        if (done) {
          break;
        }
        handleChunk(value);
      } catch (err) {
        throw err;
      }
    }
    if (error) {
      throw error;
    }
    return buffer;
  } else {
    throw new Error(`serial port not found`);
  }
});
var sendCommand = (_0, _1) => __async(void 0, [_0, _1], function* ({ reader, writer }, opt) {
  const timeout = opt.timeout || 0;
  let responseData = null;
  let responseLength = 0;
  if (opt.responseData && opt.responseData.length > 0) {
    responseData = new Uint8Array(opt.responseData);
  }
  if (responseData) {
    responseLength = responseData.length;
  }
  if (opt.responseLength) {
    responseLength = opt.responseLength;
  }
  let cmd = opt.cmd;
  if (cmd instanceof Array) {
    cmd = new Uint8Array([...cmd, ...[constants_default.Sync_CRC_EOP]]);
  }
  if (reader && writer) {
    try {
      writer.write(cmd);
    } catch (err) {
      throw new Error(`Sending ${cmd.toString()} : ${err.message}`);
    }
    try {
      const data = yield receiveData(reader, timeout, responseLength);
      if (responseData && !bufferEqual(data, responseData)) {
        throw new Error(`${cmd} response mismatch: ${data.toString()}, ${responseData.toString()}`);
      }
      return data;
    } catch (err) {
      throw new Error(`Sending ${cmd.toString()}: ${err.message}`);
    }
  } else {
    throw new Error(`serial port not found`);
  }
});

// src/stk500v1/stk500.ts
var sync = (_0, _1, _2) => __async(void 0, [_0, _1, _2], function* (serial, attempts, { timeout, debug }) {
  debug && console.log("sync");
  const opt = {
    cmd: [constants_default.Cmnd_STK_GET_SYNC],
    responseData: constants_default.OK_RESPONSE,
    timeout
  };
  let tries = 0;
  while (tries <= attempts) {
    tries += 1;
    try {
      const result = yield sendCommand(serial, opt);
      debug && console.log("sync complete", result, tries);
      return result;
    } catch (err) {
      console.log(err);
    }
    if (tries <= attempts) {
      debug && console.log(`failed! will try again (${tries})`);
    }
  }
  throw new Error(`Sync failed after ${attempts} attempts`);
});
function uint8ArrayToHex(uint8Array) {
  return Array.from(uint8Array).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
var verifySignature = (_0, _1, _2) => __async(void 0, [_0, _1, _2], function* (serial, signature, { timeout, debug }) {
  debug && console.log("verify signature");
  const match = new Uint8Array([
    constants_default.Resp_STK_INSYNC,
    ...signature,
    constants_default.Resp_STK_OK
  ]);
  const opt = {
    cmd: [constants_default.Cmnd_STK_READ_SIGN],
    responseLength: match.length,
    timeout
  };
  try {
    const data = yield sendCommand(serial, opt);
    if (data) {
      debug && console.log("confirm signature", data, uint8ArrayToHex(data));
    } else {
      debug && console.log("confirm signature", "no data");
    }
    return data;
  } catch (err) {
    throw err;
  }
});
var setOptions = (_0, _1, _2) => __async(void 0, [_0, _1, _2], function* (serial, options, { timeout, debug }) {
  debug && console.log("set device");
  const opt = {
    cmd: [
      constants_default.Cmnd_STK_SET_DEVICE,
      options.devicecode || 0,
      options.revision || 0,
      options.progtype || 0,
      options.parmode || 0,
      options.polling || 0,
      options.selftimed || 0,
      options.lockbytes || 0,
      options.fusebytes || 0,
      options.flashpollval1 || 0,
      options.flashpollval2 || 0,
      options.eeprompollval1 || 0,
      options.eeprompollval2 || 0,
      options.pagesizehigh || 0,
      options.pagesizelow || 0,
      options.eepromsizehigh || 0,
      options.eepromsizelow || 0,
      options.flashsize4 || 0,
      options.flashsize3 || 0,
      options.flashsize2 || 0,
      options.flashsize1 || 0
    ],
    responseData: constants_default.OK_RESPONSE,
    timeout
  };
  try {
    const data = yield sendCommand(serial, opt);
    debug && console.log("setOptions", data);
    return data;
  } catch (err) {
    throw err;
  }
});
var enterProgrammingMode = (_0, _1) => __async(void 0, [_0, _1], function* (serial, { timeout, debug }) {
  debug && console.log("send enter programming mode");
  const opt = {
    cmd: [constants_default.Cmnd_STK_ENTER_PROGMODE],
    responseData: constants_default.OK_RESPONSE,
    timeout
  };
  try {
    const data = yield sendCommand(serial, opt);
    debug && console.log("sent enter programming mode", data);
    return data;
  } catch (err) {
    throw err;
  }
});
var loadAddress = (_0, _1, _2) => __async(void 0, [_0, _1, _2], function* (serial, useaddr, { timeout, debug }) {
  debug && console.log("load address");
  const addr_low = useaddr & 255;
  const addr_high = useaddr >> 8 & 255;
  const opt = {
    cmd: [
      constants_default.Cmnd_STK_LOAD_ADDRESS,
      addr_low,
      addr_high
    ],
    responseData: constants_default.OK_RESPONSE,
    timeout
  };
  try {
    const data = yield sendCommand(serial, opt);
    debug && console.log("loaded address", data);
    return data;
  } catch (err) {
    throw err;
  }
});
var loadPage = (_0, _1, _2) => __async(void 0, [_0, _1, _2], function* (serial, writeBytes, { timeout, debug }) {
  debug && console.log("load page");
  const bytes_low = writeBytes.length & 255;
  const bytes_high = writeBytes.length >> 8;
  const cmd = new Uint8Array([
    constants_default.Cmnd_STK_PROG_PAGE,
    bytes_high,
    bytes_low,
    70,
    ...writeBytes,
    constants_default.Sync_CRC_EOP
  ]);
  const opt = {
    responseData: constants_default.OK_RESPONSE,
    cmd,
    timeout
  };
  try {
    const data = yield sendCommand(serial, opt);
    debug && console.log("loaded page", data);
    return data;
  } catch (err) {
    throw err;
  }
});
var upload = (serial, hex, options) => __async(void 0, null, function* () {
  const { timeout, debug, pageSize } = options;
  debug && console.log("program");
  let pageaddr = 0;
  let writeBytes;
  let useaddr;
  try {
    while (pageaddr < hex.length) {
      debug && console.log("program page");
      useaddr = pageaddr >> 1;
      yield loadAddress(serial, useaddr, options);
      writeBytes = hex.slice(pageaddr, hex.length > pageSize ? pageaddr + pageSize : hex.length - 1);
      yield loadPage(serial, writeBytes, options);
      debug && console.log("programmed page");
      pageaddr = pageaddr + writeBytes.length;
      yield new Promise((resolve) => setTimeout(resolve, 4));
      debug && console.log("page done");
    }
  } catch (err) {
    throw err;
  }
  debug && console.log("upload done");
  return true;
});
var exitProgrammingMode = (_0, _1) => __async(void 0, [_0, _1], function* (serial, { timeout, debug }) {
  debug && console.log("send leave programming mode");
  const opt = {
    cmd: [constants_default.Cmnd_STK_LEAVE_PROGMODE],
    responseData: constants_default.OK_RESPONSE,
    timeout
  };
  try {
    const data = yield sendCommand(serial, opt);
    debug && console.log("sent leave programming mode", data);
    return data;
  } catch (err) {
    throw err;
  }
});
var verify = (serial, hex, options) => __async(void 0, null, function* () {
  const { timeout, debug, pageSize } = options;
  debug && console.log("verify");
  let pageaddr = 0;
  let writeBytes;
  let useaddr;
  try {
    while (pageaddr < hex.length) {
      debug && console.log("verify page");
      useaddr = pageaddr >> 1;
      yield loadAddress(serial, useaddr, options);
      writeBytes = hex.slice(pageaddr, hex.length > pageSize ? pageaddr + pageSize : hex.length - 1);
      yield verifyPage(serial, writeBytes, options);
      debug && console.log("verified page");
      pageaddr = pageaddr + writeBytes.length;
      yield new Promise((resolve) => setTimeout(resolve, 4));
      debug && console.log("page done");
    }
  } catch (err) {
    throw err;
  }
  debug && console.log("verify done");
  return true;
});
var verifyPage = (serial, writeBytes, options) => __async(void 0, null, function* () {
  const { pageSize, timeout, debug } = options;
  debug && console.log("verify page");
  const match = new Uint8Array([
    constants_default.Resp_STK_INSYNC,
    ...writeBytes,
    constants_default.Resp_STK_OK
  ]);
  const size = writeBytes.length >= pageSize ? pageSize : writeBytes.length;
  const opt = {
    cmd: [
      constants_default.Cmnd_STK_READ_PAGE,
      size >> 8 & 255,
      size & 255,
      70
    ],
    responseLength: match.length,
    timeout
  };
  try {
    const data = yield sendCommand(serial, opt);
    debug && console.log("confirm page", data, uint8ArrayToHex(data));
    return data;
  } catch (err) {
    throw err;
  }
});
var bootload = (serial, hex, opt) => __async(void 0, null, function* () {
  const parameters = {
    pagesizehigh: opt.pagesizehigh << 8 & 255,
    pagesizelow: opt.pagesizelow & 255
  };
  try {
    yield sync(serial, 3, opt);
    yield sync(serial, 3, opt);
    yield sync(serial, 3, opt);
    const sign = new Uint8Array(opt.signature);
    yield verifySignature(serial, sign, opt);
    yield setOptions(serial, parameters, opt);
    yield enterProgrammingMode(serial, opt);
    yield upload(serial, hex, opt);
    yield verify(serial, hex, opt);
    yield exitProgrammingMode(serial, opt);
  } catch (err) {
    throw err;
  }
  return true;
});

// src/avrbro.ts
var isAvailable = () => navigator && navigator.serial;
var parseHex = (buffer) => {
  const hex = parseIntelHex(buffer).data;
  return hex;
};
var openSerial = (..._0) => __async(void 0, [..._0], function* (options = {}) {
  const {
    baudRate = 57600,
    filters = null
  } = options;
  try {
    let port;
    if (filters) {
      port = yield navigator.serial.requestPort(filters);
    } else {
      port = yield navigator.serial.requestPort();
    }
    yield port.open({ baudRate });
    const reader = port.readable.getReader();
    const writer = port.writable.getWriter();
    return { port, reader, writer };
  } catch (e) {
    console.log(e);
  }
  return null;
});
var closeSerial = (_0) => __async(void 0, [_0], function* ({ port, reader, writer }) {
  writer.releaseLock();
  reader.releaseLock();
  yield port.close();
});
var wait = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};
var reset = (serial) => __async(void 0, null, function* () {
  serial.port.setSignals({ requestToSend: true, dataTerminalReady: true });
  yield wait(250);
  serial.port.setSignals({ requestToSend: false, dataTerminalReady: false });
  yield wait(50);
});
var flash = (serial, hexData, options) => __async(void 0, null, function* () {
  if (!options) {
    throw new Error(`I need options to do this!`);
  }
  const _a = options, { debug, boardName } = _a, boardOptions = __objRest(_a, ["debug", "boardName"]);
  let props = __spreadValues({ debug }, boardOptions);
  debug && console.log(`will flash .hex file on board...`);
  if (boardName) {
    const board = getBoard(boardName);
    props = __spreadValues(__spreadValues({}, props), board);
  }
  if (!props.name) {
    throw new Error("Cannot find board name!");
  }
  try {
    yield reset(serial);
    const flashResult = yield bootload(serial, hexData, props);
    debug && console.log(`flash complete successfully`);
    return flashResult;
  } catch (err) {
    debug && console.log(`encountered errors during flash :(`);
    throw err;
  }
});
var avrbro = {
  isAvailable,
  openSerial,
  closeSerial,
  parseHex,
  flash,
  reset,
  boardsHelper: boards_exports
};
var avrbro_default = avrbro;
export {
  Resp_STK_INSYNC,
  Resp_STK_OK,
  avrbro,
  boards,
  bootload,
  avrbro_default as default,
  getBoard,
  parseIntelHex,
  receiveData,
  sendCommand,
  sync
};
//# sourceMappingURL=avrbro.mjs.map