local self = {}

function self.is_nil(x)
    return x == nil
end

function self.is_table(x) 
    return (not self.is_nil(x)) and type(x) == 'table'
end

function self.is_array(x) 
    return (not self.is_nil(x)) and self.is_table(x) and not self.is_nil(x[0])
end

function self.is_lua_array(x)
    return (not self.is_nil(x)) and self.is_table(x) and not self.is_array(x) and not self.is_nil(x[1])
end

function self.is_map(x) 
    return (not self.is_nil(x)) and self.is_table(x) and not self.is_array(x) and not self.is_lua_array(x)
end

function self.is_number(x) 
    return (not self.is_nil(x)) and type(x) == 'number'
end

function self.is_positive_number(x)
    return (not self.is_nil(x)) and x > 0
end

function self.is_negative_number(x)
    return (not self.is_nil(x)) and x < 0
end

function self.is_integer(x)
    return (not self.is_nil(x)) and self.is_number(x) and math.floor(x) == x 
end

function self.is_unsigned_integer(x)
    return (not self.is_nil(x)) and self.is_integer(x) and (self.is_positive_number(x) or x == 0)
end

function self.is_float(x)
    return (not self.is_nil(x)) and self.is_number(x) and not self.is_integer(x)
end

function self.is_string(x) 
    return (not self.is_nil(x)) and type(x) == 'string'
end

function self.is_boolean(x) 
    return (not self.is_nil(x)) and type(x) == 'boolean'
end

function self.is_function(x) 
    return (not self.is_nil(x)) and type(x) == 'function'
end

function self.is_primitive(x)
    return self.is_string(x) or self.is_boolean(x) or self.is_number(x) or self.is_nil(x)
end

function self.are(...)
    local args = {...}
    assert(not (#args == 0))
    for i, x in ipairs(args) do
        if i % 2 == 0 and not self['is_' .. args[i - 1]](args[i]) then
            return false
        end
    end
    return true
end

return self