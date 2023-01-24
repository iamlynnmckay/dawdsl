import { Any, Type } from "../common";

const SensibleDefaults = [
  {
    name: "SensibleDefaults",
    dependsOn: ["NonEmptyDefaults"],
    definition: {
      transport: {
        lpb: (_1: Any, v: Any, _2: Any) => (Type.undefined(v) ? 8 : v),
      },
      instruments: {
        // phrase playback program: 0 = Off, 1-126 = specific phrase, 127 = keymap.
        phrase_program: (_1: Any, v: Any, _2: Any) =>
          Type.undefined(v) ? 127 : v,
      },
      tracks: {
        visible_note_columns: (_1: Any, v: Any, _2: Any) =>
          Type.undefined(v) ? 1 : v,
        visible_effect_columns: (_1: Any, v: Any, _2: Any) =>
          Type.undefined(v) ? 0 : v,
      },
      patterns: {
        number_of_lines: (_1: Any, v: Any, _2: Any) =>
          Type.undefined(v) ? 64 : v,
      },
      events: {
        pattern: (_1: Any, v: Any, _2: Any) => (Type.undefined(v) ? 0 : v),
        track: (_1: Any, v: Any, _2: Any) => (Type.undefined(v) ? 0 : v),
        line: (_1: Any, v: Any, _2: Any) => (Type.undefined(v) ? 0 : v),
        instrument_value: (_1: Any, v: Any, _2: Any) =>
          Type.undefined(v) ? 0 : v,
        volume_value: (_1: Any, v: Any, _2: Any) =>
          Type.undefined(v) ? 0x7f : v,
        note_column: (_1: Any, v: Any, _2: Any) => (Type.undefined(v) ? 0 : v),
        effect_column: (_1: Any, v: Any, _2: Any) =>
          Type.undefined(v) ? 0 : v,
      },
    },
  },
];

export { SensibleDefaults };
