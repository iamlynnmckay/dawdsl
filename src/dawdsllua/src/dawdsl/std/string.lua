local dawdsl = { std = { 
    array = require 'dawdsl.std.array',
    export = require 'dawdsl.std.export' 
} }

local self = {}

function self.split(str, sep)
    sep = sep or "%s"
    local array = dawdsl.std.array()
    local i = 0
    for s in string.gmatch(str, "([^"..sep.."]+)") do
            array[i] = s
            i = i + 1
    end
    return array
end

return dawdsl.std.export(self)