/**
* Grabbed on https://github.com/noopkat/avrgirl-arduino
*/
interface Board {
    name: string;
    baud: number;
    signature: number[];
    pageSize?: number;
    numPages?: number;
    timeout?: number;
    productId?: string[];
    productPage: string;
    protocol: string;
    aliases?: string[];
    delay1?: number;
    delay2?: number;
    stabDelay?: number;
    cmdexeDelay?: number;
    synchLoops?: number;
    byteDelay?: number;
    pollValue?: number;
    pollIndex?: number;
}
declare const boards: Board[];
/**
 * Get a board object by name
 */
declare const getBoard: (name: string) => Board;

type boardsHelper_Board = Board;
declare const boardsHelper_boards: typeof boards;
declare const boardsHelper_getBoard: typeof getBoard;
declare namespace boardsHelper {
  export { type boardsHelper_Board as Board, boardsHelper_boards as boards, boardsHelper_getBoard as getBoard };
}

declare const Resp_STK_INSYNC = 20;
declare const Resp_STK_OK = 16;

declare const receiveData: (reader: any, timeout: number, responseLength: number) => Promise<Uint8Array>;
declare const sendCommand: ({ reader, writer }: {
    reader: any;
    writer: any;
}, opt: any) => Promise<Uint8Array>;

declare const sync: (serial: any, attempts: number, { timeout, debug }: any) => Promise<any>;
declare const bootload: (serial: any, hex: Uint8Array, opt: any) => Promise<boolean>;

/**
 * Grabbed on https://github.com/bminer/intel-hex.js
 */
interface IntelHexResult {
    data: Uint8Array;
    startSegmentAddress: number | null;
    startLinearAddress: number | null;
}
declare const parseIntelHex: (data_u8: Uint8Array, bufferSize?: number) => IntelHexResult;

interface SerialPort {
    setSignals(signals: {
        requestToSend: boolean;
        dataTerminalReady: boolean;
    }): void;
    open(options: {
        baudRate: number;
    }): Promise<void>;
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
    openSerial: (options?: {
        baudRate?: number;
        filters?: any;
    }) => Promise<Serial | null>;
    closeSerial: (serial: Serial) => Promise<void>;
    parseHex: (buffer: Uint8Array) => Uint8Array;
    flash: (serial: Serial, hexData: Uint8Array, options?: FlashOptions) => Promise<any>;
    reset: (serial: Serial) => Promise<void>;
    boardsHelper: typeof boardsHelper;
}
declare const avrbro: AvrBro;

export { type Board, Resp_STK_INSYNC, Resp_STK_OK, avrbro, boards, bootload, avrbro as default, getBoard, parseIntelHex, receiveData, sendCommand, sync };
