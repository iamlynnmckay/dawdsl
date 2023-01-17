local std = require 'std'
local renoise = require 'renoiselang.renoise'
local trackerlang = require 'trackerlang'

local self = {}

function self._interpreter_transport(program)
    if (not (program.transport == nil)) then
        program.transport = program.transport or {}
        renoise.set_transport_lines_per_beat(program.transport.lines_per_beat)
    end
    return program
end

function self._interpreter_instruments(program)
    if (not (program.instruments == nil)) then
        for index = 0, #program.instruments do
            local instrument = program.instruments[index]
            if (not (instrument.instrument_filename == nil)) then
                renoise.clear_instrument(index)
                renoise.set_selected_instrument_index(index)
                renoise.load_instrument(instrument.instrument_filename)
                renoise.set_instrument_phrase_program_keymap(index)
            end
            if (not (instrument.instrument_sample_filename == nil)) then
                renoise.clear_instrument(index)
                renoise.set_selected_instrument_index(index)
                renoise.load_instrument_sample(instrument.instrument_sample_filename)
                renoise.set_instrument_phrase_program_keymap(index)
            end
            if (not (instrument.instrument_name == nil)) then
                renoise.set_instrument_name(instrument.instrument_name)
            end
        end
    end
    return program
end

function self._interpreter_tracks(program)
    if (not (program.tracks == nil)) then 
        renoise.set_number_of_tracks(#program.tracks + 1)
        for track = 0, #program.tracks do
            local note_columns = program.tracks[track].note_columns
            local effects_columns = program.tracks[track].effects_columns
            renoise.set_number_of_note_columns(track, note_columns) 
            renoise.set_number_of_effects_columns(track, effects_columns) 
            renoise.set_volume_column_visible(track)
            renoise.set_volume_panning_column_visible(track)
            renoise.set_delay_column_visible(track)
            renoise.set_sample_effects_column_visible(track)
        end
    end
    return program
end

function self._interpreter_patterns(program)
    if (not (program.patterns == nil)) then
        renoise.set_number_of_patterns(#program.patterns + 1)
        for index = 0, #program.patterns do
            local pattern = program.patterns[index]
            renoise.clear_pattern(index)
            print(pattern.lines)
            renoise.set_number_of_lines(index, pattern.lines)
        end
    end
    return program
end

function self._interpreter_data(program)
    if (not (program.data == nil)) then
        for i = 0, #program.data do
            local x = program.data[i]
            if x.note_value then renoise.set_note_value(x.pattern, x.track, x.line, x.note_column, x.note_value) end
            if x.note_string then renoise.set_note_string(x.pattern, x.track, x.line, x.note_column, x.note_string) end
            if x.instrument_value then renoise.set_instrument_value(x.pattern, x.track, x.line, x.note_column, x.instrument_value) end
            if x.volume_value then renoise.set_volume_value(x.pattern, x.track, x.line, x.note_column, x.volume_value) end
            if x.panning_value then renoise.set_panning_value(x.pattern, x.track, x.line, x.note_column, x.panning_value) end
            if x.delay_value then renoise.set_delay_value(x.pattern, x.track, x.line, x.note_column, x.delay_value) end
            if x.effect_number_value then renoise.set_effect_number_value(x.pattern, x.track, x.line, x.note_column, x.effect_number_value) end
            if x.effect_amount_value then renoise.set_effect_amount_value(x.pattern, x.track, x.line, x.note_column, x.effect_amount_value) end
            if x.line_effect_number_value then renoise.set_line_effect_number_value(x.pattern, x.track, x.line, x.effect_column, x.line_effect_number_value) end
            if x.line_effect_amount_value then renoise.set_line_effect_amount_value(x.pattern, x.track, x.line, x.effect_column, x.line_effect_amount_value) end
        end
    end
    return program
end

function self.interpreter(modules)
    modules.insert_before('interpreter_transport', self._interpreter_transport)
    modules.insert_after('interpreter_instruments', self._interpreter_instruments, 'interpreter_transport')
    modules.insert_after('interpreter_tracks', self._interpreter_tracks, 'interpreter_instruments')
    modules.insert_after('interpreter_patterns', self._interpreter_patterns, 'interpreter_tracks')
    modules.insert_after('interpreter_data', self._interpreter_data, 'interpreter_patterns')
    modules.insert_before('interpreter', function(program) return program end)
    return modules
end

return self.interpreter

