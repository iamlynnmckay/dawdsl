local dawdsl = { 
    std = require 'dawdsl.std',
    renoiselang = { interpreter = { renoise = require 'dawdsl.renoiselang.interpreter.renoise' } }
}

local self = {}

self._generator = dawdsl.std.generator(dawdsl.renoiselang.interpreter.renoise)

function self._renoiselang_transport(program)
    local a = program.__program or {}
    if (not (program.transport == nil)) then
        for k, v in pairs(program.transport) do
            a = dawdsl.std.push(a, dawdsl.std.array(self._generator.song.transport[k], dawdsl.std.array(v)))
        end
    end
    program.__program = a
    return program
end

function self._renoiselang_instruments(program)
    local a = program.__program or {}
    if (not (program.instruments == nil)) then
        for instrument = 0, #program.instruments do
            a = dawdsl.std.push(a, dawdsl.std.array(self._generator.song.instruments.clear, dawdsl.std.array(instrument + 1)))
            a = dawdsl.std.push(a, dawdsl.std.array(self._generator.song.selected_instrument_index, dawdsl.std.array(instrument + 1)))
            for k, v in pairs(program.instruments[instrument]) do
                if k == "instrument_filename" then
                    a = dawdsl.std.push(a, dawdsl.std.array(self._generator.app.load_instrument, dawdsl.std.array(v)))
                elseif k == "instrument_sample_filename" then
                    a = dawdsl.std.push(a, dawdsl.std.array(self._generator.app.load_instrument_sample, dawdsl.std.array(v)))
                else
                    a = dawdsl.std.push(a, dawdsl.std.array(self._generator.song.instruments[k], dawdsl.std.array(instrument + 1, v)))
                end
            end
        end
    end
    program.__program = a
    return program
end

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

function self._renoiselang_data(program)
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

function self._renoiselang_program(program)
    return program.__program
end

function self.renoiselang(modules)
    modules.insert_before('renoiselang_transport', self._renoiselang_transport)
    modules.insert_after('renoiselang_instruments', self._renoiselang_instruments, 'renoiselang_transport')
    modules.insert_after('renoiselang_tracks', self._renoiselang_tracks, 'renoiselang_instruments')
    modules.insert_after('renoiselang_patterns', self._renoiselang_patterns, 'renoiselang_tracks')
    modules.insert_after('renoiselang_data', self._renoiselang_data, 'renoiselang_patterns')
    modules.insert_after('renoiselang_program', self._renoiselang_program, 'renoiselang_data')
    modules.insert_before('renoiselang', function(program) return program end)
    return modules
end

return self.renoiselang

