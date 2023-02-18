import assert from "assert";
import { Any } from "./Any";

export class Assert {
  public static error<T>(): T {
    return Assert.true(false) as unknown as T;
  }
  public static true(condition: boolean): boolean {
    return Assert.equal(condition, true);
  }
  public static false(condition: boolean): boolean {
    return Assert.equal(condition, false);
  }
  public static equal(a: Any, b: Any): boolean {
    assert.deepStrictEqual(a, b);
    return true;
  }
}
