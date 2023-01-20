local dawdsl = { std = {
    type = require 'dawdsl.std.type',
    at = require 'dawdsl.std.at',
    visitor = require 'dawdsl.std.visitor',
    array = require 'dawdsl.std.array',
    tostring = require 'dawdsl.std.tostring',
    size = require 'dawdsl.std.size'
} }

local self = {}

function self.diff(object)
    local diff = dawdsl.std.array()
    dawdsl.std.visitor(
        object, 
        function(new_object, old_object_root, path) 
            if dawdsl.std.size(path) == 0 then return new_object end
            local old_object = dawdsl.std.at(old_object_root, path)
            if (
                (type(old_object) ~= type(new_object)) or (
                    dawdsl.std.type.is_primitive(new_object) and new_object ~= old_object
                )) then
                diff[#diff] = {actual = new_object, expected = old_object}
            end
            return new_object
        end
    )
    return diff
end

return self.diff