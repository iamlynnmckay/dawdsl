export type RenoiseJson = {
  program: {
    transport: {
      lpb: string;
    };
    instruments: {
      name: string;
      phrase_program: string;
      filepath: string;
      sample_filepath: string;
    }[];
    patterns: {
      number_of_lines: string;
      tracks: {
        visible_note_columns: string;
        visible_effect_columns: string;
        volume_colum_visible: string;
        panning_column_visible: string;
        delay_column_visible: string;
        sample_effects_column_visible: string;
        note_columns: {
          note_value: string;
          note_string: string;
          instrument_value: string;
          instrument_string: string;
          volume_value: string;
          volumne_string: string;
          panning_value: string;
          panning_string: string;
          delay_value: string;
          delay_string: string;
          effect_number_value: string;
          effect_number_string: string;
          effect_amount_value: string;
          effect_amount_string: string;
        }[];
        effect_columns: {
          number_value: string;
          number_string: string;
          amount_value: string;
          amount_string: string;
        }[];
      }[];
    }[];
  };
};
