local dawdsl = { std = {
    iterator = require 'dawdsl.std.iterator',
    call = require 'dawdsl.std.call',
    type = require 'dawdsl.std.type'
} }

local self = {}

function self.foreach(f, ...)
    assert(not dawdsl.std.type.is_nil(f))
    local args = {...}
    for i, v, k in dawdsl.std.call(dawdsl.std.iterator, args) do
        f(i, v, k)
    end
end

return self.foreach