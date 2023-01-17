local rxi = { json = require 'rxi.json.lua.json' }
local std = {
    type = require 'std.type',
    visitor = require 'std.visitor',
    export = require 'std.export',
    indices = require 'std.indices',
    tostring = require 'std.tostring'
}

local self = {}

function self.encode(object)
    object = std.visitor(
        object, 
        function(object) 
            local result = object
            if not (std.type.is_primitive(object) or std.type.is_table(object)) then
                result = tostring(object)
            end
            return result
        end
    )
    object = std.indices.start_at_one(object)
    if (not std.type.is_table(object)) then
        return tostring(object)
    else
        return rxi.json.encode(object)
    end
end

function self.decode(json_string)
    local object = rxi.json.decode(json_string)
    object = std.indices.start_at_zero(object)
    return object
end

return std.export(self)