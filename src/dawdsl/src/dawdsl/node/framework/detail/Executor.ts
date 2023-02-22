import { Value } from "../../../common/framework";
import { File, TypeOf } from "../../std";

export class Executor {
  static execute(evaluate: (program: Value) => Value, argument: Value): Value {
    if (TypeOf.String(argument)) {
      return Executor.execute(evaluate, JSON.parse(File.readSync(argument)));
    } else if (TypeOf.Array(argument)) {
      return argument.map((arg: Value) => Executor.execute(evaluate, arg));
    } else {
      return evaluate(argument);
    }
  }
}
