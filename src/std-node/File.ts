import * as fs from "fs/promises";
import * as _fs from "fs";
import { std } from "../../common";

export class File {
  static readSync(file: string): string {
    return _fs.readFileSync(file, { encoding: "utf-8" });
  }
  static writeSync(file: string, data: string) {
    return _fs.writeFileSync(file, data);
  }
}

//
export const read_string_from_file: (path: string) => Promise<string> = (path) => fs.readFile(path).then(buffer => buffer.toString())
//
export const write_string_to_file: (path:string, data:string) => Promise<void> = (path, data) => fs.writeFile(path, data)
//
export const is_file: (path: string) => Promise<boolean> = (path) =>
 fs.access(path, fs.constants.F_OK).then(() => true).catch(() => false)
//
export const is_directory: (path: string) => Promise<boolean> = (path) =>
fs.stat(path).then(stats => stats.isDirectory())
//