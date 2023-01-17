local std = require 'std'

local self = {}

function self._default_transport(program)
    program.transport = program.transport or {}
    program.transport.lines_per_beat = program.transport.lines_per_beat or 8
    return program
end

function self._default_instruments(program)
    return program
end

function self._default_tracks(program)
    program.tracks = program.tracks or std.array() 
    for track = 0, #program.tracks do
        program.tracks[track].note_columns = program.tracks[track].note_columns or 1
        program.tracks[track].effects_columns = program.tracks[track].effects_columns or 1
    end
    return program
end

function self._default_patterns(program)
    program.patterns = program.patterns or std.array() 
    for index = 0, #program.patterns do
        local pattern = program.patterns[index]
        pattern.lines = pattern.lines or 64
    end
    return program
end

function self._default_data(program)
    program.data = program.data or std.array() 
    for i = 0, #program.data do
        local x = program.data[i]
        if (not x.pattern) then x.pattern = 0 end
        if (not x.track) then x.track = 0 end
        if (not x.line) then x.line = 0 end
        if (not x.instrument_value) then x.instrument_value = 0 end
        if (not x.volume_value) then x.volume_value = 0x7F end
        if (not x.note_column) then x.note_column = 0 end
        if (not x.effect_column) then x.effect_column = 0 end
    end
    return program
end

function self.default(modules)
    modules.insert_before('default_transport', self._default_transport)
    modules.insert_after('default_instruments', self._default_instruments, 'default_transport')
    modules.insert_after('default_tracks', self._default_tracks, 'default_instruments')
    modules.insert_after('default_patterns', self._default_patterns, 'default_tracks')
    modules.insert_after('default_data', self._default_data, 'default_patterns')
    return modules
end

return self.default


