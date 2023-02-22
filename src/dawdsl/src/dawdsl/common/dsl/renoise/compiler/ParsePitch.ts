import { Specification } from "../../../framework";
import { Any } from "../../../std";
import { Pitch } from "../detail";

const ParsePitch: Specification = [
  {
    key: "ParsePitch",
    before: ["FlattenEventArrays"],
    after: [],
    value: {
      program: {
        events: (_1: Any, v: Any, _2: Any) => {
          if (!v.pitch) return v;
          v.note_string = Pitch.evaluate(v.pitch).note_string;
          v.pitch = undefined;
          return v;
        },
      },
    },
  },
];

export { ParsePitch };
