local std = {
    type = require 'std.type',
    array = require 'std.array'
}

local self = {}

function self.visitor(object, callback, path)
    level = level or 0
    path = path or std.array()
    local new_object = {}
    local j = #path
    if std.type.is_array(object) then
        new_object = std.array()
        for i = 0, #object do
            path[j] = i
            new_object[i] = self.visitor(object[i], callback, path)
        end
    elseif std.type.is_lua_array(object) then
        for i, v in ipairs(object) do
            path[j] = i
            new_object[i] = self.visitor(v, callback, path)
        end
    elseif std.type.is_map(object) then
        for k, v in pairs(object) do
            path[j] = k
            new_object[k] = self.visitor(v, callback, path)
        end
    else
        assert(not std.type.is_table(object))
        new_object = object
    end
    local result = callback(new_object, object, path)
    return result
end

return self.visitor