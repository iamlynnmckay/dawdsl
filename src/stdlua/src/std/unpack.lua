local std = { 
    type = require 'std.type'
}
local unpack = unpack or table.unpack

local self = {}

function self.unpack(xs)
    assert(not (std.type.is_nil(xs)))
    if std.type.is_array(xs) then
        local n = std.table.size(xs)
        if n == 0 then
            return nil
        elseif n == 1 then
            return xs[0]
        else
            return xs[0], unpack(xs)
        end
    elseif std.type.is_lua_array(xs) then
        return unpack(xs)
    else
        return xs
    end
end

return self.unpack