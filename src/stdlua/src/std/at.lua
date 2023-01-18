local std = {
    foreach = require 'std.foreach',
    type = require 'std.type',
    size = require 'std.size',
    tostring = require 'std.tostring'
}

local self = {}

function self.at(object, path)
    local value = nil
    if (std.type.is_table(path) and std.size(path) > 0) then
        value = object
        for i = 0, std.size(path) - 1 do
            value = value[path[i]]
        end
    else
        assert(std.type.is_string(path) or std.type.is_unsigned_integer(path))
        value = object[path]
    end
    assert(value ~= nil)
    return value
end

return self.at