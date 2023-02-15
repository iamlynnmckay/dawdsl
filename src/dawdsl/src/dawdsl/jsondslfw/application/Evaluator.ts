import { Graph } from "../../stdjs";
import { Query } from "./Query";
import { Module, Specification, Value } from "./Type";

export class Evaluator {
  static evaluate(modules: Specification): (program: Value) => Value {
    return (program: Value): Value => {
      Graph.asArray<Module>(modules).forEach((module: Module) => {
        program = Query.deepQuery(module, program);
      });
      return program;
    };
  }
}
