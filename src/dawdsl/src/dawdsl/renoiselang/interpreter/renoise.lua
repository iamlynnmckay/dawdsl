return {
    app = {
        load_instrument = function(value) if renoise ~= nil then renoise.app():load_instrument(value) end end,
        load_instrument_sample = function(value) if renoise ~= nil then renoise.app():load_instrument_sample(value) end end
    },
    song = {
        transport = { 
            lpb = function(value) if renoise ~= nil then renoise.song().transport.lpb = value end end
        },
        instruments = {
            clear = function(instrument) if renoise ~= nil then renoise.song().instruments[instrument]:clear() end end,
            name = function(instrument, value) if renoise ~= nil then renoise.song().instruments[instrument].name = value end end,
            phrase_program = function(instrument, value) if renoise ~= nil then
                print("@@@TODO: PHRASE PROGRAM IS SOMEHOW NOT WORKING!!!"))
                renoise.song().instruments[instrument].phrase_program = value
            end end
        },
        tracks = {
            visible_note_columns = function(track, value) if renoise ~= nil then renoise.song().tracks[track].visible_note_columns = value end end,
            visible_effect_columns = function(track, value) if renoise ~= nil then renoise.song().tracks[track].visible_effect_columns = value end end,
            volume_column_visible = function(track, value) if renoise ~= nil then renoise.song().tracks[track].volume_column_visible = value end end,
            panning_column_visible = function(track, value) if renoise ~= nil then renoise.song().tracks[track].panning_column_visible = value end end,
            delay_column_visible = function(track, value) if renoise ~= nil then renoise.song().tracks[track].delay_column_visible = value end end,
            sample_effects_column_visible = function(track, value) if renoise ~= nil then renoise.song().tracks[track].sample_effects_column_visible = value end end
        },
        patterns = {
            clear = function(pattern) if renoise ~= nil then renoise.song().patterns[pattern]:clear() end end,
            number_of_lines = function(pattern, value) if renoise ~= nil then renoise.song().patterns[pattern].number_of_lines = value end end,
            tracks = {
                lines = {
                    note_columns = {
                        note_value = function(pattern, track, line, note_column, value) if renoise ~= nil then renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].note_value = value end end,
                        note_string = function(pattern, track, line, note_column, value) if renoise ~= nil then renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].note_string = value end end,
                        instrument_value = function(pattern, track, line, note_column, value) if renoise ~= nil then renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].instrument_value = value end end,
                        volume_value = function(pattern, track, line, note_column, value) if renoise ~= nil then renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].volume_value = value end end,
                        panning_value = function(pattern, track, line, note_column, value) if renoise ~= nil then renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].panning_value = value end end,
                        delay_value = function(pattern, track, line, note_column, value) if renoise ~= nil then renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].delay_value = value end end,
                        effect_number_value = function(pattern, track, line, note_column, value) if renoise ~= nil then renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].effect_number_value = value end end,
                        effect_amount_value = function(pattern, track, line, note_column, value) if renoise ~= nil then renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].effect_amount_value = value end end,
                    },
                    effect_columns = {
                        number_value = function(pattern, track, line, effect_column, value) if renoise ~= nil then renoise.song().patterns[pattern].tracks[track].lines[line].effect_columns[effect_column].number_value = value end end,
                        number_string = function(pattern, track, line, effect_column, value) if renoise ~= nil then renoise.song().patterns[pattern].tracks[track].lines[line].effect_columns[effect_column].number_string = value end end,
                        amount_value = function(pattern, track, line, effect_column, value) if renoise ~= nil then renoise.song().patterns[pattern].tracks[track].lines[line].effect_column[effect_column].amount_value = value end end,
                    }
                }
            }
        },
        insert_track_at = function(value) if renoise ~= nil then renoise.song():insert_track_at(value) end end,
        sequencer = { 
            insert_new_pattern_at = function(value) if renoise ~= nil then renoise.song().sequencer:insert_new_pattern_at(value) end end, 
        },
        selected_instrument_index = function(value) if renoise ~= nil then renoise.song().selected_instrument_index = value end end
    }
}