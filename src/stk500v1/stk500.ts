import { sendCommand } from './stk500-io';
import Statics from './constants';

export const sync = async (serial: any, attempts: number, { timeout, debug }: any): Promise<any> => {
  debug && console.log('sync');

  const opt = {
    cmd: [Statics.Cmnd_STK_GET_SYNC],
    responseData: Statics.OK_RESPONSE,
    timeout
  };

  let tries = 0;

  while (tries <= attempts) {
    tries += 1;
    try {
      const result = await sendCommand(serial, opt);
      debug && console.log('sync complete', result, tries);
      return result;
    } catch (err) {
      console.log(err);
    }
    if (tries <= attempts) {
      debug && console.log(`failed! will try again (${tries})`);
    }
  }
  throw new Error(`Sync failed after ${attempts} attempts`);
};

function uint8ArrayToHex(uint8Array: Uint8Array): string {
  return Array.from(uint8Array) // Convert Uint8Array to a regular array
      .map(byte => byte.toString(16).padStart(2, '0')) // Convert each byte to a 2-character hex string
      .join(''); // Join all hex strings together
}

const verifySignature = async (serial: any, signature: Uint8Array, { timeout, debug }: any): Promise<any> => {
  debug && console.log('verify signature');

  const match = new Uint8Array([
    Statics.Resp_STK_INSYNC,
    ...signature,
    Statics.Resp_STK_OK
  ]);

  const opt = {
    cmd: [Statics.Cmnd_STK_READ_SIGN],
    responseLength: match.length,
    timeout
  };
  try {
    const data = await sendCommand(serial, opt);
    if (data) {
      debug && console.log('confirm signature', data, uint8ArrayToHex(data));
    } else {
      debug && console.log('confirm signature', 'no data');
    }
    return data;
  } catch (err) {
    throw err;
  }
};

const getSignature = async (serial: any, { timeout, debug }: any): Promise<any> => {
  debug && console.log('get signature');

  const opt = {
    cmd: [Statics.Cmnd_STK_READ_SIGN],
    responseLength: 5,
    timeout
  };
  try {
    const data = await sendCommand(serial, opt);
    debug && console.log('getSignature', data);
    return data;
  } catch (err) {
    throw err;
  }
};

const setOptions = async (serial: any, options: any, { timeout, debug }: any): Promise<any> => {
  debug && console.log('set device');
  const opt = {
    cmd: [
      Statics.Cmnd_STK_SET_DEVICE,
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
    responseData: Statics.OK_RESPONSE,
    timeout
  };
  try {
    const data = await sendCommand(serial, opt);
    debug && console.log('setOptions', data);
    return data;
  } catch (err) {
    throw err;
  }
};

const enterProgrammingMode = async (serial: any, { timeout, debug }: any): Promise<any> => {
  debug && console.log('send enter programming mode');
  const opt = {
    cmd: [Statics.Cmnd_STK_ENTER_PROGMODE],
    responseData: Statics.OK_RESPONSE,
    timeout
  };
  try {
    const data = await sendCommand(serial, opt);
    debug && console.log('sent enter programming mode', data);
    return data;
  } catch (err) {
    throw err;
  }
};

const loadAddress = async (serial: any, useaddr: number, { timeout, debug }: any): Promise<any> => {
  debug && console.log('load address');
  const addr_low = useaddr & 0xff;
  const addr_high = (useaddr >> 8) & 0xff;
  const opt = {
    cmd: [
      Statics.Cmnd_STK_LOAD_ADDRESS,
      addr_low,
      addr_high
    ],
    responseData: Statics.OK_RESPONSE,
    timeout
  };
  try {
    const data = await sendCommand(serial, opt);
    debug && console.log('loaded address', data);
    return data;
  } catch (err) {
    throw err;
  }
};

const loadPage = async (serial: any, writeBytes: Uint8Array, { timeout, debug }: any): Promise<any> => {
  debug && console.log('load page');
  const bytes_low = writeBytes.length & 0xff;
  const bytes_high = writeBytes.length >> 8;

  const cmd = new Uint8Array([
    Statics.Cmnd_STK_PROG_PAGE, bytes_high, bytes_low, 0x46,
    ...writeBytes,
    Statics.Sync_CRC_EOP
  ]);

  const opt = {
    responseData: Statics.OK_RESPONSE,
    cmd,
    timeout
  };

  try {
    const data = await sendCommand(serial, opt);
    debug && console.log('loaded page', data);
    return data;
  } catch (err) {
    throw err;
  }
};

const upload = async (serial: any, hex: Uint8Array, options: any): Promise<boolean> => {
  const { timeout, debug, pageSize } = options;

  debug && console.log('program');
  let pageaddr = 0;
  let writeBytes;
  let useaddr;

  try {
    while (pageaddr < hex.length) {
      debug && console.log('program page');
      useaddr = pageaddr >> 1;
      await loadAddress(serial, useaddr, options);
      writeBytes = hex.slice(pageaddr, (hex.length > pageSize ? (pageaddr + pageSize) : hex.length - 1));
      await loadPage(serial, writeBytes, options);
      debug && console.log('programmed page');
      pageaddr = pageaddr + writeBytes.length;
      await new Promise((resolve) => setTimeout(resolve, 4));
      debug && console.log('page done');
    }
  } catch (err) {
    throw err;
  }
  debug && console.log('upload done');
  return true;
};

const exitProgrammingMode = async (serial: any, { timeout, debug }: any): Promise<any> => {
  debug && console.log('send leave programming mode');
  const opt = {
    cmd: [Statics.Cmnd_STK_LEAVE_PROGMODE],
    responseData: Statics.OK_RESPONSE,
    timeout
  };
  try {
    const data = await sendCommand(serial, opt);
    debug && console.log('sent leave programming mode', data);
    return data;
  } catch (err) {
    throw err;
  }
};

const verify = async (serial: any, hex: Uint8Array, options: any): Promise<boolean> => {
  const { timeout, debug, pageSize } = options;

  debug && console.log('verify');
  let pageaddr = 0;
  let writeBytes;
  let useaddr;

  try {
    while (pageaddr < hex.length) {
      debug && console.log('verify page');
      useaddr = pageaddr >> 1;
      await loadAddress(serial, useaddr, options);
      writeBytes = hex.slice(pageaddr, (hex.length > pageSize ? (pageaddr + pageSize) : hex.length - 1));
      await verifyPage(serial, writeBytes, options);
      debug && console.log('verified page');
      pageaddr = pageaddr + writeBytes.length;
      await new Promise((resolve) => setTimeout(resolve, 4));
      debug && console.log('page done');
    }
  } catch (err) {
    throw err;
  }
  debug && console.log('verify done');
  return true;
};

const verifyPage = async (serial: any, writeBytes: Uint8Array, options: any): Promise<any> => {
  const { pageSize, timeout, debug } = options;

  debug && console.log('verify page');
  const match = new Uint8Array([
    Statics.Resp_STK_INSYNC,
    ...writeBytes,
    Statics.Resp_STK_OK
  ]);
  const size = writeBytes.length >= pageSize ? pageSize : writeBytes.length;
  const opt = {
    cmd: [
      Statics.Cmnd_STK_READ_PAGE,
      (size >> 8) & 0xff,
      size & 0xff,
      0x46
    ],
    responseLength: match.length,
    timeout
  };
  try {
    const data = await sendCommand(serial, opt);
    debug && console.log('confirm page', data, uint8ArrayToHex(data));
    return data;
  } catch (err) {
    throw err;
  }
};

export const bootload = async (serial: any, hex: Uint8Array, opt: any): Promise<boolean> => {
  const parameters = {
    pagesizehigh: (opt.pagesizehigh << 8 & 0xff),
    pagesizelow: opt.pagesizelow & 0xff
  };

  try {
    // send two dummy syncs like avrdude does
    await sync(serial, 3, opt);
    await sync(serial, 3, opt);
    await sync(serial, 3, opt);
    const sign = new Uint8Array(opt.signature);
    await verifySignature(serial, sign, opt);
    await setOptions(serial, parameters, opt);
    await enterProgrammingMode(serial, opt);
    await upload(serial, hex, opt);
    await verify(serial, hex, opt);
    await exitProgrammingMode(serial, opt);
  } catch (err) {
    throw err;
  }
  return true;
};
