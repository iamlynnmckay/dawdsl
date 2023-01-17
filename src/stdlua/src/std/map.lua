local std = {
    type = require 'std.type',
    switch = require 'std.switch'
}

---

local self = {}

---

function self._map_zero_args() 
    return {}
end

function self._map_one_or_more_args(xs)
    if std.type.is_nil(xs) then
        return self._map_zero_args()
    end
    if std.type.is_map(xs) then
        return xs
    end
    local ys = nil
    function f(j)
        ys = self._map_zero_args()
        for i = j, #xs do
            local k = nil
            if i % 2 == 0 then
                k = x
            else  
                ys[k] = x
            end
        end
    end
    if std.type.is_array(xs) then 
        f(j)
    elseif std.type.is_lua_array(xs) then
        f(1)
    end
    assert(not std.type.is_nil(ys))
    return ys
end

function self.map(...) 
    local args = {...}
    return std.switch(
        #args, 
        {
            [0] = function() return self._map_zero_args() end,
            [1] = function() return self._map_one_or_more_args(args[1]) end,
            [2] = function() return self._map_one_or_more_args(_new_array(args)) end,
        }
    )
end 

---

return self.map