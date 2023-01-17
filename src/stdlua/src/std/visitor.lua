local std = {
    type = require 'std.type',
    array = require 'std.array'
}

local self = {}

function self.visitor(object, callback, level)
    level = level or 0
    local new_object = {}
    if std.type.is_array(object) then
        new_object = std.array()
        for i = 0, #object do
            new_object[i] = self.visitor(object[i], callback, level + 1)
        end
    elseif std.type.is_lua_array(object) then
        for i, v in ipairs(object) do
            new_object[i] = self.visitor(v, callback, level + 1)
        end
    elseif std.type.is_map(object) then
        for k, v in pairs(object) do
            new_object[k] = self.visitor(v, callback, level + 1)
        end
    else
        assert(not std.type.is_table(object))
        new_object = object
    end
    local result = callback(new_object, level)
    return result
end

return self.visitor