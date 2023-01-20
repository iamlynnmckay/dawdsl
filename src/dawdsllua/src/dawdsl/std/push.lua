local dawdsl = { std = {
    array = require 'dawdsl.std.array',
    size = require 'dawdsl.std.size'
} }

local self = {}

function self.push(array, value)
    if dawdsl.std.size(array) == 0 then
        return dawdsl.std.array(value)
    else
        array[dawdsl.std.size(array)] = value
        return array
    end
end

return self.push