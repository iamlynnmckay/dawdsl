local std = {
    type = require 'std.type',
    unpack = require 'std.unpack'
}

local self = {}

function self.call(f, xs)
    assert(not (std.type.is_nil(xs)))
    assert(not (std.type.is_nil(f)))
    assert(std.type.is_function(f))
    return f(std.unpack(xs))
end

return self.call

