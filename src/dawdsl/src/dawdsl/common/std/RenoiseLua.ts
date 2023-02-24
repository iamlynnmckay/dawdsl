import { Any } from "./Any";

const RenoiseLua: { [_: string]: Any } = {
  app: {
    load_instrument: (value: string) =>
      `renoise.app():load_instrument("${value}")`,
    load_instrument_sample: (value: string) =>
      `renoise.app():load_instrument_sample("${value}")`,
  },
  song: {
    transport: {
      lpb: (value: number) => `renoise.song().transport.lpb = ${value}`,
    },
    instruments: {
      clear: (instrument: number) =>
        `renoise.song().instruments[${instrument + 1}]:clear()`,
      name: (instrument: number, name: string) =>
        `renoise.song().instruments[${instrument + 1}].name = "${name}"`,
      phrase_program: (instrument: number, value: number) =>
        `renoise.song().instruments[${
          instrument + 1
        }].phrase_program = ${value}`,
    },
    tracks: {
      visible_note_columns: (track: number, value: number) =>
        `renoise.song().tracks[${track + 1}].visible_note_columns = ${value}`,
      visible_effect_columns: (track: number, value: number) =>
        `renoise.song().tracks[${track + 1}].visible_effect_columns = ${value}`,
      volume_column_visible: (track: number, value: boolean) =>
        `renoise.song().tracks[${track + 1}].volume_column_visible = ${value}`,
      panning_column_visible: (track: number, value: boolean) =>
        `renoise.song().tracks[${track + 1}].panning_column_visible = ${value}`,
      delay_column_visible: (track: number, value: boolean) =>
        `renoise.song().tracks[${track + 1}].delay_column_visible = ${value}`,
      sample_effects_column_visible: (track: number, value: boolean) =>
        `renoise.song().tracks[${
          track + 1
        }].sample_effects_column_visible = ${value}`,
    },

    patterns: {
      clear: (pattern: number) => `renoise.song().patterns[${pattern}]:clear()`,
      number_of_lines: (pattern: number, value: number) =>
        `renoise.song().patterns[${pattern + 1}].number_of_lines = ${value}`,
      tracks: {
        lines: {
          note_columns: {
            note_value: (
              pattern: number,
              track: number,
              note_column: number,
              line: number,
              value: number
            ) =>
              `renoise.song().patterns[${pattern + 1}].tracks[${
                track + 1
              }].lines[${line + 1}].note_columns[${
                note_column + 1
              }].note_value = ${value}`,
            note_string: (
              pattern: number,
              track: number,
              note_column: number,
              line: number,
              value: string
            ) =>
              `renoise.song().patterns[${pattern + 1}].tracks[${
                track + 1
              }].lines[${line + 1}].note_columns[${
                note_column + 1
              }].note_string = ${value}`,
            instrument_value: (
              pattern: number,
              track: number,
              note_column: number,
              line: number,
              value: number
            ) =>
              `renoise.song().patterns[${pattern + 1}].tracks[${
                track + 1
              }].lines[${line + 1}].note_columns[${
                note_column + 1
              }].instrument_value = ${value}`,
            volume_value: (
              pattern: number,
              track: number,
              note_column: number,
              line: number,
              value: number
            ) =>
              `renoise.song().patterns[${pattern + 1}].tracks[${
                track + 1
              }].lines[${line + 1}].note_columns[${
                note_column + 1
              }].volume_value = ${value}`,
            panning_value: (
              pattern: number,
              track: number,
              note_column: number,
              line: number,
              value: number
            ) =>
              `renoise.song().patterns[${pattern + 1}].tracks[${
                track + 1
              }].lines[${line + 1}].note_columns[${
                note_column + 1
              }].panning_value = ${value}`,
            delay_value: (
              pattern: number,
              track: number,
              note_column: number,
              line: number,
              value: number
            ) =>
              `renoise.song().patterns[${pattern + 1}].tracks[${
                track + 1
              }].lines[${line + 1}].note_columns[${
                note_column + 1
              }].delay_value = ${value}`,
            effect_number_value: (
              pattern: number,
              track: number,
              note_column: number,
              line: number,
              value: number
            ) =>
              `renoise.song().patterns[${pattern + 1}].tracks[${
                track + 1
              }].lines[${line + 1}].note_columns[${
                note_column + 1
              }].effect_number_value = ${value}`,
            effect_amount_value: (
              pattern: number,
              track: number,
              note_column: number,
              line: number,
              value: number
            ) =>
              `renoise.song().patterns[${pattern + 1}].tracks[${
                track + 1
              }].lines[${line + 1}].note_columns[${
                note_column + 1
              }].effect_amount_value = ${value}`,
          },
          effect_columns: {
            number_value: (
              pattern: number,
              track: number,
              effect_column: number,
              line: number,
              value: number
            ) =>
              `renoise.song().patterns[${pattern + 1}].tracks[${
                track + 1
              }].lines[${line + 1}].effect_columns[${
                effect_column + 1
              }].number_value = ${value}`,
            number_string: (
              pattern: number,
              track: number,
              effect_column: number,
              line: number,
              value: string
            ) =>
              `renoise.song().patterns[${pattern + 11}].tracks[${
                track + 1
              }].lines[${line + 1}].effect_columns[${
                effect_column + 1
              }].number_string = ${value}`,
            amount_value: (
              pattern: number,
              track: number,
              effect_column: number,
              line: number,
              value: number
            ) =>
              `renoise.song().patterns[${pattern + 1}].tracks[${
                track + 1
              }].lines[${line + 1}].effect_column[${
                effect_column + 1
              }].amount_value = ${value}`,
          },
        },
      },
    },

    insert_track_at: (track: number) =>
      `renoise.song():insert_track_at(${track + 1})`,
    sequencer: {
      insert_new_pattern_at: (pattern: number) =>
        `renoise.song().sequencer:insert_new_pattern_at(${pattern + 1})`,
    },
    selected_instrument_index: (instrument: number) =>
      `renoise.song().selected_instrument_index = ${instrument + 1}`,
  },
};

export { RenoiseLua as Renoise };
