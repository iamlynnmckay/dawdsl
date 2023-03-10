local self = {}

function self.equals(t1, t2)
    -- used with modification from https://web.archive.org/web/20131225070434/http://snippets.luacode.org/snippets/Deep_Comparison_of_Two_Values_3
    local ty1 = type(t1)
    local ty2 = type(t2)
    if ty1 ~= ty2 then 
        return false
    end
    -- non-table types can be directly compared
    if ty1 ~= 'table' and ty2 ~= 'table' then 
        return t1 == t2
    end
    -- as well as tables which have the metamethod __eq
    local mt = getmetatable(t1)
    if mt and mt.__eq then 
        return t1 == t2
    end
    for k1, v1 in pairs(t1) do
        local v2 = t2[k1]
        if v2 == nil or not self.equals(v1, v2) then 
            return false
        end
    end
    for k2, v2 in pairs(t2) do
        local v1 = t1[k2]
        if v1 == nil or not self.equals(v1, v2) then 
            return false
        end
    end
    return true
end

return self.equals