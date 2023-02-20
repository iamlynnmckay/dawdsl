local dawdsl = { std = { 
    type = require 'dawdsl.std.type',
    size = require 'dawdsl.std.size'
} }

local self = {}

function self.unpack(xs)
    local unpack = unpack or table.unpack
    if dawdsl.std.type.is_array(xs) then
        local n = dawdsl.std.size(xs)
        if n == 0 then
            return nil
        elseif n == 1 then
            return xs[0]
        else
            return xs[0], unpack(xs)
        end
    elseif dawdsl.std.type.is_lua_array(xs) then
        return unpack(xs)
    else
        return xs
    end
end

return self.unpack