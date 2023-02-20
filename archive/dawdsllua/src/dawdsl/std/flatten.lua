local dawdsl = { std = {
    type = require 'dawdsl.std.type',
    array = require 'dawdsl.std.array',
    foreach = require 'dawdsl.std.foreach'
} }

local self = {}

function self.flatten(xs)
    local i = 0
    local result = dawdsl.std.array()
    assert(dawdsl.std.type.is_array(xs))
    dawdsl.std.foreach(
        function(_, vv, _) 
            assert(dawdsl.std.type.is_array(xs))
            dawdsl.std.foreach(
                function(_, v, _)
                    result[i] = v
                    i = i + 1
                end,
                vv
            )
        end,
        xs
    )
    return result
end

return self.flatten