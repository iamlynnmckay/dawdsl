local std = {
    type = require 'std.type'
}

local self = {}

function self.size(xs)
    assert(std.type.is_table(xs))
    if std.type.is_lua_array(xs) then
        return #xs
    elseif std.type.is_array(xs) then
        return #xs + 1
    elseif std.type.is_map(xs) then
        local c = 0
        for _ in pairs(xs) do c = c + 1 end
        return c
    else
        assert(false)
    end
end

return self.size