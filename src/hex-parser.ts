/**
 * Grabbed on https://github.com/bminer/intel-hex.js
 */

//Intel Hex record types
const DATA = 0,
  END_OF_FILE = 1,
  EXT_SEGMENT_ADDR = 2,
  START_SEGMENT_ADDR = 3,
  EXT_LINEAR_ADDR = 4,
  START_LINEAR_ADDR = 5,
  EMPTY_VALUE = 0xFF;

interface IntelHexResult {
  data: Uint8Array;
  startSegmentAddress: number | null;
  startLinearAddress: number | null;
}

export const parseIntelHex = (data_u8: Uint8Array, bufferSize?: number): IntelHexResult => {
  let data: string;
  data = new TextDecoder().decode(data_u8);

  //Initialization
  let buf = new Uint8Array(bufferSize || 8192),
    bufLength = 0, //Length of data in the buffer
    highAddress = 0, //upper address
    startSegmentAddress: number | null = null,
    startLinearAddress: number | null = null,
    lineNum = 0, //Line number in the Intel Hex string
    pos = 0; //Current position in the Intel Hex string
  const SMALLEST_LINE = 11;
  while (pos + SMALLEST_LINE <= data.length) {
    //Parse an entire line
    if (data.charAt(pos++) !== ':') {
      throw new Error(`Line ${lineNum + 1} does not start with a colon (:).`);
    } else {
      lineNum++;
    }
    //Number of bytes (hex digit pairs) in the data field
    const dataLength = parseInt(data.substr(pos, 2), 16);
    pos += 2;
    //Get 16-bit address (big-endian)
    const lowAddress = parseInt(data.substr(pos, 4), 16);
    pos += 4;
    //Record type
    const recordType = parseInt(data.substr(pos, 2), 16);
    pos += 2;
    //Data field (hex-encoded string)
    const dataField = data.substr(pos, dataLength * 2);
    const dataFieldBuf = new Uint8Array(dataLength);
    for (let i = 0; i < dataLength; i++) {
      dataFieldBuf[i] = parseInt(dataField.substr(i * 2, 2), 16);
    }
    pos += dataLength * 2;
    //Checksum
    const checksum = parseInt(data.substr(pos, 2), 16);
    pos += 2;
    //Validate checksum
    let calcChecksum = (dataLength + (lowAddress >> 8) + lowAddress + recordType) & 0xFF;
    for (let i = 0; i < dataLength; i++) {
      calcChecksum = (calcChecksum + dataFieldBuf[i]) & 0xFF;
    }
    calcChecksum = (0x100 - calcChecksum) & 0xFF;
    if (checksum !== calcChecksum) {
      throw new Error(
        `Invalid checksum on line ${lineNum}: got ${checksum}, but expected ${calcChecksum}`
      );
    }
    //Parse the record based on its recordType
    switch (recordType) {
      case DATA:
        const absoluteAddress = highAddress + lowAddress;
        //Expand buf, if necessary
        if (absoluteAddress + dataLength >= buf.length) {
          let tmp = new Uint8Array((absoluteAddress + dataLength) * 2);
          tmp.set(buf);
          buf = tmp;
        }
        //Write over skipped bytes with EMPTY_VALUE
        if (absoluteAddress > bufLength) {
          buf.fill(EMPTY_VALUE, bufLength, absoluteAddress);
        }
        //Write the dataFieldBuf to buf
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
          startLinearAddress,
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
    //Advance to the next line
    if (data.charAt(pos) === '\r') {
      pos++;
    }
    if (data.charAt(pos) === '\n') {
      pos++;
    }
  }
  throw new Error(`Unexpected end of input: missing or invalid EOF record.`);
};
