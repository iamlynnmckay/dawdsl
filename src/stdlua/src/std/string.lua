local std = { 
    array = require 'std.array',
    export = require 'std.export' 
}

local self = {}

function self.split(str, sep)
    sep = sep or "%s"
    local array = std.array()
    local i = 0
    for s in string.gmatch(str, "([^"..sep.."]+)") do
            array[i] = s
            i = i + 1
    end
    return array
end

return std.export(self)