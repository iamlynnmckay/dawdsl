local std = {
    type = require 'std.type'
}

local self = {}

function self.switch(i, fs)
    assert(std.type.is_unsigned_integer(i))
    local x = fs[math.min(i, #fs)]()
    assert(not std.type.is_nil(x))
    return x
end

return self.switch

