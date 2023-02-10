import { Any, Is } from "../common";
import { DirectedAcyclicGraph } from "../common/Graph";
import { Specification } from "../common/Type";
const SensibleDefaults: DirectedAcyclicGraph<Specification.Value> = [
  {
    key: "SensibleDefaults",
    before: ["NonEmptyDefaults"],
    after: [],
    value: {
      transport: {
        lpb: (_1: Any, v: Any, _2: Any) => (Is.Undefined(v) ? 8 : v),
      },
      instruments: {
        // phrase playback program: 0 = Off, 1-126 = specific phrase, 127 = keymap.
        phrase_program: (_1: Any, v: Any, _2: Any) =>
          Is.Undefined(v) ? 127 : v,
      },
      tracks: {
        visible_note_columns: (_1: Any, v: Any, _2: Any) =>
          Is.Undefined(v) ? 1 : v,
        visible_effect_columns: (_1: Any, v: Any, _2: Any) =>
          Is.Undefined(v) ? 0 : v,
      },
      patterns: {
        number_of_lines: (_1: Any, v: Any, _2: Any) =>
          Is.Undefined(v) ? 64 : v,
      },
      events: {
        pattern: (_1: Any, v: Any, _2: Any) => (Is.Undefined(v) ? 0 : v),
        track: (_1: Any, v: Any, _2: Any) => (Is.Undefined(v) ? 0 : v),
        line: (_1: Any, v: Any, _2: Any) => (Is.Undefined(v) ? 0 : v),
        instrument_value: (_1: Any, v: Any, _2: Any) =>
          Is.Undefined(v) ? 0 : v,
        volume_value: (_1: Any, v: Any, _2: Any) =>
          Is.Undefined(v) ? 0x7f : v,
        note_column: (_1: Any, v: Any, _2: Any) => (Is.Undefined(v) ? 0 : v),
        effect_column: (_1: Any, v: Any, _2: Any) => (Is.Undefined(v) ? 0 : v),
      },
    },
  },
];

export { SensibleDefaults };
