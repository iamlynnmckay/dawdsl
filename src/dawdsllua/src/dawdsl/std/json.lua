local rxi = { json = require 'rxi.json.lua.json' }
local dawdsl = { std = {
    type = require 'dawdsl.std.type',
    visitor = require 'dawdsl.std.visitor',
    export = require 'dawdsl.std.export',
    indices = require 'dawdsl.std.indices',
    tostring = require 'dawdsl.std.tostring'
} }

local self = {}

function self.encode(object)
    if dawdsl.std.type.is_string(object) then
        return "\""..object.."\""
    end
    object = dawdsl.std.visitor(
        object, 
        function(object) 
            if not (dawdsl.std.type.is_primitive(object) or dawdsl.std.type.is_table(object)) then
                object = tostring(object)
            end
            return object
        end
    )
    object = dawdsl.std.indices.start_at_one(object)
    if (not dawdsl.std.type.is_table(object)) then
        return tostring(object)
    else
        return rxi.json.encode(object)
    end
end

function self.decode(json_string)
    local object = rxi.json.decode(json_string)
    object = dawdsl.std.indices.start_at_zero(object)
    return object
end

return dawdsl.std.export(self)