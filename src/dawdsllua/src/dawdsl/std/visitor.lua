local dawdsl = { std = {
    type = require 'dawdsl.std.type',
    array = require 'dawdsl.std.array',
    size = require 'dawdsl.std.size',
    tostring = require 'dawdsl.std.tostring'
} }

local self = {}

function self.visitor(object, callback, level, path, object_root)
    level = level or 0
    object_root = object_root or object
    path = path or dawdsl.std.array()
    path[level + 1] = nil
    local new_object = {}
    if dawdsl.std.type.is_array(object) then
        new_object = dawdsl.std.array()
        for i = 0, #object do
            path[level] = i
            new_object[i] = self.visitor(object[i], callback, level + 1, path, object_root)
        end
    elseif dawdsl.std.type.is_lua_array(object) then
        for i, v in ipairs(object) do
            path[level] = i
            new_object[i] = self.visitor(v, callback, level + 1, path, object_root)
        end
    elseif dawdsl.std.type.is_map(object) then
        for k, v in pairs(object) do
            path[level] = k
            new_object[k] = self.visitor(v, callback, level + 1, path, object_root)
        end
    else
        assert(not dawdsl.std.type.is_table(object))
        new_object = object
    end
    path[level] = nil
    local result = callback(new_object, object_root, path)
    return result
end

return self.visitor