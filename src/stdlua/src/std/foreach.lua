local std = {
    iterator = require 'std.iterator',
    call = require 'std.call',
    type = require 'std.type'
}

local self = {}

function self.foreach(f, ...)
    assert(not std.type.is_nil(f))
    local args = {...}
    for i, v, k in std.call(std.iterator, args) do
        f(i, v, k)
    end
end

return self.foreach