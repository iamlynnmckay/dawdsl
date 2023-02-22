import { Specification } from "../../../framework";
import { Any, TypeOf } from "../../../std";

function applyDefaults(defaults: { [_: string]: Any }, object: Any) {
  object = object || defaults;
  Object.entries(defaults).forEach(
    ([k, v]: [string, Any]) =>
      (object[k] = TypeOf.Undefined(object[k]) ? v : object[k])
  );
  return object;
}

const SensibleDefaults: Specification = [
  {
    key: "SensibleDefaults",
    before: ["NonEmptyDefaults"],
    after: [],
    value: {
      program: {
        transport: (_1: Any, v: Any, _2: Any) => {
          return applyDefaults(
            {
              lpb: 8,
            },
            v
          );
        },
        instruments: (_1: Any, v: Any, _2: Any) => {
          return applyDefaults(
            {
              phrase_program: 127,
            },
            v
          );
        },
        tracks: (_1: Any, v: Any, _2: Any) => {
          return applyDefaults(
            {
              visible_note_columns: 1,
              visible_effect_columns: 0,
            },
            v
          );
        },
        patterns: (_1: Any, v: Any, _2: Any) => {
          return applyDefaults(
            {
              number_of_lines: 64,
            },
            v
          );
        },
        events: (_1: Any, v: Any, _2: Any) => {
          return applyDefaults(
            {
              pattern: 0,
              track: 0,
              line: 0,
              instrument_value: 0,
              volume_value: 0x7f,
              note_column: 0,
              effect_column: 0,
            },
            v
          );
        },
      },
    },
  },
];

export { SensibleDefaults };
