import { Any, TypeOf } from "../../stdjs";
import { Specification } from "../../jsondslfw";
import { Renoise } from "../renoise/Renoise";

const RenoiseLua: Specification = [
  {
    key: "RenoiseLua",
    before: ["BeforeRenoiseLua"],
    after: [],
    value: {
      program: {
        transport: (_1: Any, v: Any, o: Any) => {
          o.lua.push(Renoise.song.transport.lpb(v.lpb));
          return v;
        },
        instruments: (p: Any, v: Any, o: Any) => {
          const instrument = p[p.length - 1];
          o.lua.push(Renoise.song.instruments.clear(instrument));
          o.lua.push(Renoise.song.selected_instrument_index(instrument));
          Object.entries(v).forEach(([k, v]: [string, Any]) => {
            switch (k) {
              case "instrument_filename":
                o.lua.push(Renoise.app.load_instrument(v));
                break;
              case "instrument_sample_filename":
                o.lua.push(Renoise.app.load_instrument_sample(v));
                break;
              default:
                o.lua.push(Renoise.song.instruments[k](instrument));
                break;
            }
          });
          return v;
        },

        /*
                function self._renoiselang_tracks(program)
                    local a = program.__program or {}
                    if (not (program.tracks == nil)) then 
                        local default_number_of_tracks = 10
                        -- todo: this sets at least this many tracks, not exactly this many
                        for i = 0, (#program.tracks + 1) -  default_number_of_tracks do
                            a = dawdsl.std.push(a, dawdsl.std.array(self._generator.song.insert_track_at, dawdsl.std.array(default_number_of_tracks + i + 1)))
                        end
                        for track = 0, #program.tracks do
                            for k, v in pairs(program.tracks[track]) do
                                a = dawdsl.std.push(a, dawdsl.std.array(self._generator.song.tracks[k], dawdsl.std.array(track + 1, v)))
                            end
                        end
                    end
                    program.__program = a
                    return program
                end
                */

        tracks: (_1: Any, v: Any, _2: Any) => {
          return v;
        },

        /*
                function self._renoiselang_patterns(program)
                    local a = program.__program or {}
                    if (not (program.patterns == nil)) then
                        local default_number_of_patterns = 1
                        for i = 0, (#program.patterns + 1) -  default_number_of_patterns do
                            a = dawdsl.std.push(a, dawdsl.std.array(self._generator.song.sequencer.insert_new_pattern_at, dawdsl.std.array(default_number_of_patterns + i + 1)))
                        end
                        for pattern = 0, #program.patterns do
                            a = dawdsl.std.push(a, dawdsl.std.array(self._generator.song.patterns.clear, dawdsl.std.array(pattern + 1)))
                            for k, v in pairs(program.patterns[pattern]) do
                                a = dawdsl.std.push(a, dawdsl.std.array(self._generator.song.patterns[k], dawdsl.std.array(pattern + 1, v)))
                            end
                        end
                    end
                    program.__program = a
                    return program
                end
                */

        patterns: (_1: Any, v: Any, _2: Any) => {
          return v;
        },
        /*
                function self._renoiselang_events(program)
                    local a = program.__program or {}
                    if (not (program.data == nil)) then
                        for i = 0, #program.data do
                            local x = program.data[i]
                            for k, v in pairs(x) do
                                v = dawdsl.std.array(x.pattern + 1, x.track + 1, x.line + 1, (x.note_column + 1) or (x.effect_column + 1), v)
                                if self._generator.song.patterns.tracks.lines.note_columns[k] ~= nil then
                                    a = dawdsl.std.push(a, dawdsl.std.array(self._generator.song.patterns.tracks.lines.note_columns[k], v))
                                elseif self._generator.song.patterns.tracks.lines.effect_columns[k] ~= nil then
                                    a = dawdsl.std.push(a, dawdsl.std.array(self._generator.song.patterns.tracks.lines.effect_columns[k], v))
                                end
                            end
                        end
                    end
                    program.__program = a
                    return program
                end
                */
        events: (_1: Any, v: Any, o: Any) => {
          Object.entries(v).forEach(([k, v]: [string, Any]) => {
            if (
              !TypeOf.Undefined(
                Renoise.song.patterns.tracks.lines.note_columns[k]
              )
            ) {
              o.lua.push(
                Renoise.song.patterns.tracks.lines.note_columns[k](
                  v.pattern,
                  v.track,
                  v.note_column,
                  v.line,
                  v.value
                )
              );
            } else if (
              !TypeOf.Undefined(
                Renoise.song.patterns.tracks.lines.effect_columns[k]
              )
            ) {
              o.lua.push(
                Renoise.song.patterns.tracks.lines.effect_columns[k](
                  v.pattern,
                  v.track,
                  v.effect_column,
                  v.line,
                  v.value
                )
              );
            }
          });
          return v;
        },
      },
    },
  },
];

export { RenoiseLua };
