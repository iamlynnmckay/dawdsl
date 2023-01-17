local std = {
    type = require 'std.type',
    array = require 'std.array',
    foreach = require 'std.foreach'
}

local self = {}

function self.flatten(xs)
    local i = 0
    local result = std.array()
    assert(std.type.is_array(xs))
    std.foreach(
        function(_, vv, _) 
            assert(std.type.is_array(xs))
            std.foreach(
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