local self = {}

---

function self.get_note_value(pattern, track, line, note_column)
    -- note_value: 0-119=default, 120=OFF, 121=Empty
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    note_column = note_column + 1
    return renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].note_value
end

function self.get_note_string(pattern, track, line, note_column)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    note_column = note_column + 1
    return renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].note_string
end

function self.get_instrument_value(pattern, track, line, note_column)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    note_column = note_column + 1
    return renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].instrument_value
end

function self.get_volume_value(pattern, track, line, note_column)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    note_column = note_column + 1
    return renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].volume_value
end

function self.get_panning_value(pattern, track, line, note_column)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    note_column = note_column + 1
    return renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].panning_value
end

function self.get_delay_value(pattern, track, line, note_column)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    note_column = note_column + 1
    return renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].delay_value
end

function self.get_effect_number_value(pattern, track, line, note_column)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    note_column = note_column + 1
    return renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].effect_number_value
end

function self.get_effect_amount_value(pattern, track, line, note_column)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    note_column = note_column + 1
    return renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].effect_amount_value
end

function self.get_line_effect_number_value(pattern, track, line, effect_column)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    effect_column = effect_colum + 1
    return renoise.song().patterns[pattern].tracks[track].lines[line].effect_column[column].number_value
end

function self.get_line_effect_number_string(pattern, track, line, effect_column)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    effect_column = effect_colum + 1
    return renoise.song().patterns[pattern].tracks[track].lines[line].effect_columns[effect_column].number_string
end

function self.get_line_effect_amount_value(pattern, track, line, effect_column)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    effect_column = effect_colum + 1
    return renoise.song().patterns[pattern].tracks[track].lines[line].effect_column[note_column].amount_value
end

function self.set_note_value(pattern, track, line, note_column, note_value)
    -- note_value: 0-119=default, 120=OFF, 121=Empty
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    note_column = note_column + 1
    renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].note_value = note_value
end

function self.set_note_string(pattern, track, line, note_column, note_string)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    note_column = note_column + 1
    renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].note_string = note_string
end

function self.set_instrument_value(pattern, track, line, note_column, instrument_value)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    note_column = note_column + 1
    renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].instrument_value = instrument_value
end

function self.set_volume_value(pattern, track, line, note_column, volume_value)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    note_column = note_column + 1
    renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].volume_value = volume_value
end

function self.set_panning_value(pattern, track, line, note_column, panning_value)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    note_column = note_column + 1
    renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].panning_value = panning_value
end

function self.set_delay_value(pattern, track, line, note_column, delay_value)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    note_column = note_column + 1
    renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].delay_value = delay_value
end

function self.set_effect_number_value(pattern, track, line, note_column, effect_number_value)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    note_column = note_column + 1
    renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].effect_number_value = effect_number_value
end

function self.set_effect_amount_value(pattern, track, line, note_column, effect_amount_value)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    note_column = note_column + 1
    renoise.song().patterns[pattern].tracks[track].lines[line].note_columns[note_column].effect_amount_value = effect_amount_value
end

function self.set_line_effect_number_value(pattern, track, line, effect_column, number_value)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    effect_column = effect_colum + 1
    renoise.song().patterns[pattern].tracks[track].lines[line].effect_columns[effect_column].number_value = number_value
end

function self.set_line_effect_number_string(pattern, track, line, effect_column, number_string)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    effect_column = effect_colum + 1
    renoise.song().patterns[pattern].tracks[track].lines[line].effect_columns[effect_column].number_string = number_string
end

function self.set_line_effect_amount_value(pattern, track, line, effect_column, amount_value)
    pattern = pattern + 1
    track = track + 1
    line = line + 1
    effect_column = effect_colum + 1
    renoise.song().patterns[pattern].tracks[track].lines[line].effect_column[column].amount_value = amount_value
end

function self.get_value_sequence(pattern, track, line, note_column, getter, length)
    local value_sequence = { [0] = nil }
    for i = 0, length do
        value_sequence[i] = getter(pattern, track, line + i, note_column)
    end
    return value_sequence
end

function self.set_value_sequence(pattern, track, line, note_column, setter, value_sequence)
    for i = 0, #value_sequence do
        setter(pattern, track, line + i, note_column, value_sequence[i])
    end
end

function self.get_number_of_patterns()
    return #renoise.song().patterns
end

function self.get_number_of_tracks()
    return #renoise.song().tracks
end

function self.get_number_of_lines(pattern)
    pattern = pattern + 1
    return renoise.song().patterns[pattern].number_of_lines
end

function self.get_number_of_note_columns(track)
    track = track + 1
    return renoise.song().tracks[track].visible_note_columns
end

function self.get_number_of_effects_columns(track)
    track = track + 1
    return renoise.song().tracks[track].visible_effect_columns
end

function self.set_number_of_patterns(patterns)
    -- todo: this sets at least this many patterns, not exactly this many
    for i = 0, patterns - self.get_number_of_patterns() do
        renoise.song().sequencer:insert_new_pattern_at(self.get_number_of_patterns() + 1)
    end
end

function self.clear_pattern(pattern)
    pattern = pattern + 1
    renoise.song().patterns[pattern]:clear()
end

function self.set_number_of_tracks(tracks)
    -- todo: this sets at least this many patterns, not exactly this many
    for i = 0, tracks - self.get_number_of_tracks() do
        renoise.song():insert_track_at(self.get_number_of_tracks() + 1)
    end
end

function self.set_number_of_lines(pattern, lines)
    pattern = pattern + 1
    renoise.song().patterns[pattern].number_of_lines = lines
end

function self.set_number_of_note_columns(track, note_columns)
    track = track + 1
    renoise.song().tracks[track].visible_note_columns = note_columns
end

function self.set_number_of_effects_columns(track, effects_columns)
    track = track + 1
    renoise.song().tracks[track].visible_effect_columns = effects_columns
end

---

function self.set_volume_column_visible(track)
    track = track + 1
    renoise.song().tracks[track].volume_column_visible = true
end

function self.set_volume_panning_column_visible(track)
    track = track + 1
    renoise.song().tracks[track].panning_column_visible = true
end

function self.set_delay_column_visible(track)
    track = track + 1
    renoise.song().tracks[track].delay_column_visible = true
end

function self.set_sample_effects_column_visible(track)
    track = track + 1
    renoise.song().tracks[track].sample_effects_column_visible = true
end 

---

function self.new_song_no_template()
    renoise.app():new_song_no_template()
end

function self.load_song(filename)
    renoise.app():load_song(filename)
end

function self.save_song_as(filename)
    renoise.app():save_song_as(filename)
end

---

function self.get_instrument_name(instrument)
    instrument = instrument + 1
    return renoise.song().instruments[instrument].name
end

function self.set_instrument_name(instrument, name)
    instrument = instrument + 1
    renoise.song().instruments[instrument].name = name
end

function self.clear_instrument(instrument)
    instrument = instrument + 1
    renoise.song().instruments[instrument]:clear()
end

function self.set_selected_instrument_index(instrument)
    instrument = instrument + 1
    renoise.song().selected_instrument_index = instrument
end

function self.load_instrument(filename)
    renoise.app():load_instrument(filename)
end

function self.load_instrument_sample(filename)
    renoise.app():load_instrument_sample(filename)
end

function self.set_instrument_phrase_program(instrument, phase_program)
    -- Phrase playback program: 0 = Off, 1-126 = specific phrase, 127 = keymap.
    instrument = instrument + 1 
    renoise.song().instruments[instrument].phrase_program = phase_program
end

function self.set_instrument_phrase_program_off(instrument)
    self.set_instrument_phrase_program(instrument, 0)
end

function self.set_instrument_phrase_program_keymap(instrument)
    self.set_instrument_phrase_program(instrument, 127)
end

---

function self.set_transport_lines_per_beat(lpb) 
    renoise.song().transport.lpb = lpb
end

function self.get_transport_lines_per_beat() 
    return renoise.song().transport.lpb
end

---

return self