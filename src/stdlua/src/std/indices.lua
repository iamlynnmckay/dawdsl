local std = {
    type = require 'std.type',
    visitor = require 'std.visitor',
    array = require 'std.array'
}

local self = {}

function self.start_at_zero(object)
    return std.visitor(
        object, 
        function(object) 
            local result = object
            if std.type.is_lua_array(object) then
                result = std.array()
                for i, v in ipairs(object) do
                    result[i - 1] = v
                end
            end
            return result
        end
    )
end

function self.start_at_one(object)
    return std.visitor(
        object, 
        function(object) 
            local result = object
            if std.type.is_array(object) then
                result = {}
                for i = 0, #object do
                    local v = object[i]
                    result[i + 1] = v
                end
            end
            return result
        end
    )
end

return self