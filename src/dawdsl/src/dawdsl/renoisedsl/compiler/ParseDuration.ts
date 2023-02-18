import { Any } from "../../stdjs";
import { Specification } from "../../jsondslfw";
import { Duration } from "../library";
import { Assert } from "../../stdjs/Assert";

const ParseDuration: Specification = [
  {
    key: "ParseDuration",
    before: ["FlattenEventArrays"],
    after: [],
    value: {
      program: {
        patterns: (_1: Any, v: Any, o: Any) => {
          v.number_of_lines = v.number_of_lines || v.duration * o.transport.lpb;
          delete v.duration;
          return v;
        },
        events: (k: Any, v: Any, o: Any) => {
          // find the next event after this event with the same instrument, track, and note column
          let next_index = k[k.length - 1];
          if (next_index == o.program.events.length - 1) return v;
          let w = o.program.events[next_index + 1];
          while (
            v.instrument_value != w.instrument_value &&
            v.track != w.track &&
            v.note_column != w.note_column
          ) {
            next_index = next_index + 1;
            w = o.program.events[next_index];
          }
          // get the line and pattern of the next event by the line, pattern, and duration of the current event
          const context = {
            lines_per_beat: o.program.transport.lpb,
            lines_per_pattern:
              o.program.patterns[v.pattern || 0].number_of_lines,
            relative_line: v.line || 0,
            pattern: v.pattern || 0,
          };
          const { pattern, line } = Duration.evaluate(v.duration, context);
          // set the line and pattern of the next event
          o.program.events[next_index].line = line;
          o.program.events[next_index].pattern = pattern;
          // update number of patterns
          // @@@TODO: HERE!!!
          Assert.error()
          //while (o.program.patterns.length < pattern + 1) {
          // o.program.patterns.push(o.program.patterns[v.pattern]);
          //}
          delete v.duration;
          return v;
        },
      },
    },
  },
];

export { ParseDuration };
