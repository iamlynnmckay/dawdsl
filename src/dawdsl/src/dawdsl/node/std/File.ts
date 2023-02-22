import * as fs from "fs";

export class File {
  static readSync(file: string): string {
    return fs.readFileSync(file, { encoding: "utf-8" });
  }
  static writeSync(file: string, data: string) {
    return fs.writeFileSync(file, data);
  }
}
