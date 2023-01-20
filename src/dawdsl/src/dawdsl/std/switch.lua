local dawdsl = { std = {
    type = require 'dawdsl.std.type'
} }

local self = {}

function self.switch(i, fs)
    assert(dawdsl.std.type.is_unsigned_integer(i))
    local x = fs[math.min(i, #fs)]()
    assert(not dawdsl.std.type.is_nil(x))
    return x
end

return self.switch

