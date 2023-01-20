local dawdsl = { std = { 
    type = require 'dawdsl.std.type', 
    switch = require 'dawdsl.std.switch',
    tostring = require 'dawdsl.std.tostring'
} }

local self = {}

function self._array_zero_args()
    return { [0] = nil }
end

function self._array_one_arg(x)
    return { [0] = x }
end

function self._array_two_or_more_args(xs)
    local ys = self._array_zero_args()
    for i, x in ipairs(xs) do
        ys[i - 1] = x
    end
    return ys
end

function self.array(...)
    local args = {...}
    return dawdsl.std.switch(
        #args,
        {
            [0] = function() return self._array_zero_args() end,
            [1] = function() return self._array_one_arg(args[1]) end,
            [2] = function() return self._array_two_or_more_args(args) end,
        }
    )
end

return self.array