local std = {
    type = require 'std.type',
    at = require 'std.at',
    visitor = require 'std.visitor',
    array = require 'std.array',
    tostring = require 'std.tostring',
    size = require 'std.size'
}

local self = {}

function self.diff(object)
    local diff = std.array()
    std.visitor(
        object, 
        function(new_object, old_object_root, path) 
            if std.size(path) == 0 then return new_object end
            local old_object = std.at(old_object_root, path)
            if (
                (type(old_object) ~= type(new_object)) or (
                    std.type.is_primitive(new_object) and new_object ~= old_object
                )) then
                diff[#diff] = {actual = new_object, expected = old_object}
            end
            return new_object
        end
    )
    return diff
end

return self.diff