import { Value, Specification } from "../application";
import { TypeOf, File } from "../../stdjs";

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
