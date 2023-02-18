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
          const instrument = p[p.length - 1] + 1;
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
                o.lua.push(Renoise.song.instruments[k](instrument, v));
                break;
            }
          });
          return v;
        },
        tracks: (p: Any, v: Any, o: Any) => {
          const track = p[p.length - 1] + 1;
          // by default there are 10 tracks
          const default_number_of_tracks = 10;
          if (track > default_number_of_tracks) {
            o.lua.push(Renoise.song.insert_track_at(track));
          }
          Object.entries(v).forEach(([k, v]: [string, Any]) => {
            o.lua.push(Renoise.song.tracks[k](track, v));
          });
          return v;
        },
        patterns: (p: Any, v: Any, o: Any) => {
          console.log(v);
          const pattern = p[p.length - 1] + 1;
          // by default there is 1 patterns
          const default_number_of_patterns = 1;
          if (pattern > default_number_of_patterns) {
            o.lua.push(Renoise.song.sequencer.insert_new_pattern_at(pattern));
          }
          o.lua.push(Renoise.song.patterns.clear(pattern));
          Object.entries(v).forEach(([k, v]: [string, Any]) => {
            o.lua.push(Renoise.song.patterns[k](pattern, v));
          });
          return v;
        },
        events: (_1: Any, v: Any, o: Any) => {
          Object.entries(v).forEach(([k, w]: [string, Any]) => {
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
                  w
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
                  w
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
