local dawdsl = { std = require 'dawdsl.std' }

local self = {}

function self._set_patterns_lines_by_duration(program)
    if (not (program.patterns == nil)) then
        for index = 0, #program.patterns do
            local pattern = program.patterns[index]
            pattern._duration = pattern._duration or 4
            pattern.number_of_lines = pattern.number_of_lines or pattern._duration * program.transport.lpb
            pattern._duration = nil
        end
    end
    return program
end

function self._set_data_line_by_duration(program)
    if (not (program.data == nil)) then
        for i = 0, #program.data do
            local x = program.data[i]
            if not (x._duration == nil) then
                x.pattern = x.pattern or 0
                local lines_per_pattern = program.patterns[x.pattern].number_of_lines
                local lines_per_beat = program.transport.lpb
                local beats_per_pattern = lines_per_pattern / lines_per_beat
                local lines_per_duration = dawdsl.std.math.round(dawdsl.std.math.normalize(x._duration, lines_per_pattern, 0, beats_per_pattern, 0))
                x._duration = nil
                -- set start beat
                if x._offset then
                    x.line = x._offset * lines_per_beat
                end
                -- set size
                x._size = x._size or dawdsl.std.size(lines_per_duration)
                -- set repeats
                x._repeat = x._repeat or 1
                x._size = x._size * x._repeat
                x._repeat = nil
                -- convert relative line count to absolute line count
                x.line = dawdsl.std.array(x.line)
                x.pattern = dawdsl.std.array(x.pattern)
                local f = function(j) 
                    while x.line[j] >= lines_per_pattern do
                        x.pattern[j] = x.pattern[j] + 1
                        if dawdsl.std.size(program.patterns) == x.pattern[j] then 
                            program.patterns[x.pattern[j]] = {number_of_lines = lines_per_pattern}
                        end
                        lines_per_pattern = program.patterns[x.pattern[j]].number_of_lines
                        x.line[j] = x.line[j] - lines_per_pattern
                    end
                end
                for j = 0, x._size - 1 do
                    f(j)
                    x.pattern[j + 1] = x.pattern[j]
                    x.line[j + 1] = x.line[j] + lines_per_duration[j % dawdsl.std.size(lines_per_duration)]
                end
                f(x._size)
            end
        end
    end
    return program
end

function self.duration(modules)
    modules.insert_before('set_pattern_lines_by_duration', self._set_patterns_lines_by_duration, 'default_patterns')
    modules.insert_after('set_data_line_by_duration', self._set_data_line_by_duration, 'default_data')
    return modules
end


return self.duration