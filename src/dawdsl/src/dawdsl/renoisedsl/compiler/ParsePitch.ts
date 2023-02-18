import { Any } from "../../stdjs";
import { Specification } from "../../jsondslfw";
import { Pitch } from "../library";

const ParsePitch: Specification = [
  {
    key: "ParsePitch",
    before: ["FlattenEventArrays"],
    after: [],
    value: {
      program: {
        events: (_1: Any, v: Any, _2: Any) => {
          v.note_string = Pitch.evaluate(v.pitch).note_string;
          v.pitch = undefined;
          return v;
        },
      },
    },
  },
];

export { ParsePitch };
