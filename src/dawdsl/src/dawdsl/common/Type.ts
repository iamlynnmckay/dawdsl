export class Type {
  static string<A>(a: A): boolean {
    return typeof a === "string";
  }
  static null<A>(a: A): boolean {
    return a === null;
  }
  static undefined<A>(a: A): boolean {
    return typeof a === "undefined";
  }
  static boolean<A>(a: A): boolean {
    return typeof a === "boolean";
  }
  static number<A>(a: A): boolean {
    return typeof a === "number";
  }
  static array<A>(a: A): boolean {
    return Array.isArray(a);
  }
  static function<A>(a: A): boolean {
    return typeof a === "function";
  }
  //
  static object<A>(a: A): boolean {
    return typeof a === "object" && !(Type.null(a) || Type.array(a));
  }
  //
  static integer<A>(a: A): boolean {
    return Type.number(a) && Math.round(a as number) === a;
  }
  static unsignedInteger<A>(a: A): boolean {
    return Type.integer(a) && a >= 0;
  }
}
