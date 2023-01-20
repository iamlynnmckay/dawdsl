local dawdsl = { std = {
    visitor = require 'dawdsl.std.visitor',
    type = require 'dawdsl.std.type',
    array = require 'dawdsl.std.array',
    size = require 'dawdsl.std.size',
    tostring = require 'dawdsl.std.tostring',
    foreach = require 'dawdsl.std.foreach',
} }

local self = {}

function shallow_copy(array) 
    local copy = dawdsl.std.array()
    dawdsl.std.foreach(
        function(i, v) 
            copy[i] = v
        end,
        array
    )
    return copy
end

function self.generator(table) 
    return dawdsl.std.visitor(
        table,
        function(f, _, path)
            if dawdsl.std.type.is_function(f) then
                path = shallow_copy(path)
                return path
            else
                return f
            end
        end
    )
end

return self.generator