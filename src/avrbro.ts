import * as boardsHelper from './boards';
import { parseIntelHex } from './hex-parser';
import { bootload } from './stk500v1/stk500';
import { constants } from 'buffer';

interface SerialPort {
  setSignals(signals: { requestToSend: boolean, dataTerminalReady: boolean }): void;
  open(options: { baudRate: number }): Promise<void>;
  close(): Promise<void>;
  readable: ReadableStream;
  writable: WritableStream;
}

interface Serial {
  port: SerialPort;
  reader: ReadableStreamDefaultReader;
  writer: WritableStreamDefaultWriter;
}

interface FlashOptions {
  debug?: boolean;
  boardName?: string;
  [key: string]: any;
}

interface AvrBro {
  isAvailable: () => boolean;
  openSerial: (options?: { baudRate?: number, filters?: any }) => Promise<Serial | null>;
  closeSerial: (serial: Serial) => Promise<void>;
  parseHex: (buffer: Uint8Array) => Uint8Array;
  flash: (serial: Serial, hexData: Uint8Array, options?: FlashOptions) => Promise<any>;
  reset: (serial: Serial) => Promise<void>;
  boardsHelper: typeof boardsHelper;
}

/**
 * Checks if the serial api is available
 */
const isAvailable = (): boolean => navigator && (navigator as any).serial;

/**
 * Allow to parse/check hex file
 */
const parseHex = (buffer: Uint8Array): Uint8Array => {
  const hex = parseIntelHex(buffer).data;
  return hex;
};

/**
 * Open the connection with the serial port
 */
const openSerial = async (options: { baudRate?: number, filters?: any } = {}): Promise<Serial | null> => {
  const {
    baudRate = 57600,
    filters = null
  } = options;

  // Request an Arduino from the user.
  try {
    let port;
    if (filters) {
      port = await (navigator as any).serial.requestPort(filters);
    } else {
      port = await (navigator as any).serial.requestPort();
    }
    await port.open({ baudRate });
    const reader = port.readable.getReader();
    const writer = port.writable.getWriter();
    return { port, reader, writer };
  } catch (e) {
    console.log(e);
  }
  return null;
};

/**
 * Close the connection with the serial port
 */
const closeSerial = async ({ port, reader, writer }: Serial): Promise<void> => {
  writer.releaseLock();
  reader.releaseLock();
  await port.close();
};

const wait = (duration: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

/**
 * Reset board with cycle DTR
 */
const reset = async (serial: Serial): Promise<void> => {
  serial.port.setSignals({ requestToSend: true, dataTerminalReady: true });
  await wait(250);
  serial.port.setSignals({ requestToSend: false, dataTerminalReady: false });
  await wait(50);
};

/**
 * Flash the device connected on the given serial port with the given .hex file buffer.
 * Only works with stk500 version 1 for now...
 */
const flash = async (serial: Serial, hexData: Uint8Array, options?: FlashOptions): Promise<any> => {
  if (!options) {
    throw new Error(`I need options to do this!`);
  }
  const { debug, boardName, ...boardOptions } = options;
  let props = { debug, ...boardOptions };
  debug && console.log(`will flash .hex file on board...`);
  if (boardName) {
    const board = boardsHelper.getBoard(boardName);
    props = { ...props, ...board };
  }
  if (!(props as any).name) {
    throw new Error('Cannot find board name!');
  }
  try {
    await reset(serial);
    const flashResult = await bootload(serial, hexData, props);
    debug && console.log(`flash complete successfully`);
    return flashResult;
  } catch (err) {
    debug && console.log(`encountered errors during flash :(`);
    throw err;
  }
};

const avrbro: AvrBro = {
  isAvailable,
  openSerial,
  closeSerial,
  parseHex,
  flash,
  reset,
  boardsHelper
};

export * from './stk500v1/constants';
export * from './stk500v1/stk500-io';
export * from './stk500v1/stk500';
export * from './hex-parser';
export * from './boards';

export { avrbro };
export default avrbro;
