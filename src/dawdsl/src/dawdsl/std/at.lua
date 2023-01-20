local dawdsl = { std = {
    foreach = require 'dawdsl.std.foreach',
    type = require 'dawdsl.std.type',
    size = require 'dawdsl.std.size',
    tostring = require 'dawdsl.std.tostring'
} }

local self = {}

function self.at(object, path)
    local value = nil
    if (dawdsl.std.type.is_table(path) and dawdsl.std.size(path) > 0) then
        value = object
        for i = 0, dawdsl.std.size(path) - 1 do
            value = value[path[i]]
        end
    else
        assert(dawdsl.std.type.is_string(path) or dawdsl.std.type.is_unsigned_integer(path))
        value = object[path]
    end
    assert(value ~= nil)
    return value
end

return self.at