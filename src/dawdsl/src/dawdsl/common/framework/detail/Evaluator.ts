import { Any, Graph } from "../../std";
import { Query } from "./Query";
import { Module, Specification, Value } from "../type";

export class Evaluator {
  static evaluate(modules: Specification): (program: Value) => Value {
    return (program: Value): Value =>
      Graph.asArray<Module>(modules).reduce(
        (program: Value, [name, module]: [string, Module]) => {
          {
            const tmp: { [_: string]: Any } = {};
            tmp[name] = {
              input: program,
            };
            console.log(JSON.stringify(tmp, null, 2));
          }

          const result = Object.assign(
            {},
            program,
            Query.deepQuery(module, program)
          );
          // @@@TODO
          {
            const tmp: { [_: string]: Any } = {};
            tmp[name] = {
              output: result,
            };
            console.log(JSON.stringify(tmp, null, 2));
          }

          return result;
        },
        program
      );
  }
}
