local std = { 
    type = require 'std.type', 
    switch = require 'std.switch' 
}

local self = {}

function self._array_zero_args()
    return { [0] = nil }
end

function self._array_one_or_more_args(xs)
    if std.type.is_nil(xs) then
        return self._array_zero_args()
    end
    if not std.type.is_table(xs) then
        return { [0] = xs }
    end
    local ys = nil
    if std.type.is_array(xs) then 
        ys = xs 
    elseif std.type.is_lua_array(xs) then
        ys = self._array_zero_args()
        for i, x in ipairs(xs) do
            ys[i - 1] = x
        end
    end
    assert(not std.type.is_nil(ys))
    return ys
end

function self.array(...)
    local args = {...}
    return std.switch(
        #args,
        {
            [0] = function() return self._array_zero_args() end,
            [1] = function() return self._array_one_or_more_args(args[1]) end,
            [2] = function() return self._array_one_or_more_args(self.array(args)) end,
        }
    )
end

return self.array