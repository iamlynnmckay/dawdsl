local dawdsl = { std = require 'dawdsl.std' }

local self = {}

function self._expand_table_vertically_with_size(table, size)
   -- make multiple new tables for each index of each value in this table
    local result = dawdsl.std.array() 
    dawdsl.std.foreach(
        function(i) 
            result[i] = {}
            dawdsl.std.foreach(
                function(_, v, k) 
                    if dawdsl.std.type.is_array(v) then
                        result[i][k] = v[i % dawdsl.std.size(v)] 
                    else 
                        result[i][k] = v
                    end
                end,
                table
            ) 
        end,
        size
    )
    return result
end

function self._expand_table_vertically_with_size_key(table, size_key)
    local size = table[size_key]
    table[size_key] = nil
    table = self._expand_table_vertically_with_size(table, size)
    return table
end

function self._expand_tables_vertically_with_size_key(tables, size_key)
    local result = dawdsl.std.array()
    dawdsl.std.foreach(
        function (i, v, _)
            result[i] = self._expand_table_vertically_with_size_key(v, size_key)
        end,
        tables
    )
    return dawdsl.std.flatten(result)
end

function self._expand_data_vertically_by_size(program)
    program.data = self._expand_tables_vertically_with_size_key(program.data, '_size')
    return program
end


function self.expand(modules)
    modules.insert_after('expand_data_vertically_by_size', self._expand_data_vertically_by_size, 'set_data_line_by_duration')
    return modules
end

return self.expand
