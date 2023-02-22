import { Specification, Value } from "../../../common/framework";
import { TypeOf, File } from "../../std";

const InitializeProgram: Specification = [
  {
    key: "InitializeProgram",
    before: [],
    after: [],
    value: {
      program: (_1: (string | number)[], v: Value, _2: Value) =>
        TypeOf.String(v) ? JSON.parse(File.readSync(v)) : v,
    },
  },
];

export { InitializeProgram };
