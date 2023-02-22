import { Any } from "./Any";
import { Assert } from "./Assert";
import { TypeOf } from "./TypeOf";

export class Math {
  private static call_on_number_or_array(
    f: (_: number) => number,
    xs: number | number[]
  ): number | number[] {
    return TypeOf.Array(xs) ? (xs as number[]).map((x: Any) => f(x)) : f(xs);
  }

  public static normalize(
    x: number | number[],
    y_max?: number,
    y_min?: number,
    x_max?: number,
    x_min?: number
  ): number | number[] {
    y_max = (y_max || 1) as number;
    y_min = (y_min || 0) as number;
    x_max = (x_max || 1) as number;
    x_min = (x_min || x_max * -1) as number;
    Assert.true(y_min < y_max);
    Assert.true(x_min < y_max);
    // scale values in old range to new range
    const fn = (x: number): number =>
      (y_max! - y_min!) * ((x - x_min!) / (x_max! - x_min!)) + y_min!;
    return Math.call_on_number_or_array(fn, x);
  }
}
