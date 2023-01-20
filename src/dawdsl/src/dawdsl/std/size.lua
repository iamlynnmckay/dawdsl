local dawdsl = { std = {
    type = require 'dawdsl.std.type'
} }

local self = {}

function self.size(xs)
    assert(dawdsl.std.type.is_table(xs))
    if dawdsl.std.type.is_lua_array(xs) then
        return #xs
    elseif dawdsl.std.type.is_array(xs) then
        return #xs + 1
    elseif dawdsl.std.type.is_map(xs) then
        local c = 0
        for _ in pairs(xs) do c = c + 1 end
        return c
    else
        assert(false)
    end
end

return self.size