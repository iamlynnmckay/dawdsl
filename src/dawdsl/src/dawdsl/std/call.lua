local dawdsl = { std = {
    type = require 'dawdsl.std.type',
    unpack = require 'dawdsl.std.unpack'
} }

local self = {}

function self.call(f, xs)
    assert(not (dawdsl.std.type.is_nil(xs)))
    assert(not (dawdsl.std.type.is_nil(f)))
    assert(dawdsl.std.type.is_function(f))
    return f(dawdsl.std.unpack(xs))
end

return self.call

