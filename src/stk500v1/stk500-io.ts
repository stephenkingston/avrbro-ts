import { bufferEqual } from '../utils';
import Statics from './constants';

export const receiveData = async (reader: any, timeout: number, responseLength: number): Promise<Uint8Array> => {
  const startingBytes = [Statics.Resp_STK_INSYNC];
  
  let buffer = new Uint8Array(0);
  let started = false;
  let timeoutId: NodeJS.Timeout | null = null;
  let isReading = false;
  let error: Error | null = null;

  const finished = (err?: Error) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    isReading = false;
    error = err || null;
  };

  const handleChunk = (data: Uint8Array) => {
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
        const { value, done } = await reader.read();
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
};

export const sendCommand = async ({ reader, writer }: { reader: any, writer: any }, opt: any): Promise<Uint8Array> => {
  const timeout = opt.timeout || 0;
  let responseData: Uint8Array | null = null;
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
    cmd = new Uint8Array([...cmd, ...[Statics.Sync_CRC_EOP]]);
  }
  if (reader && writer) {
    try {
      writer.write(cmd);
    } catch(err) {
      throw new Error(`Sending ${cmd.toString()} : ${(err as any).message}`);
    }
    try {
      const data = await receiveData(reader, timeout, responseLength);
      if (responseData && !bufferEqual(data, responseData)) {
        throw new Error(`${cmd} response mismatch: ${data.toString()}, ${responseData.toString()}`);
      }
      return data;
    } catch (err: any) {
      throw new Error(`Sending ${cmd.toString()}: ${err.message}`);
    }
  } else {
    throw new Error(`serial port not found`);
  }
};
