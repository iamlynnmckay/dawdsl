local dawdsl = { std = {
    type = require 'dawdsl.std.type',
    array = require 'dawdsl.std.array',
    size = require 'dawdsl.std.size',
    unpack = require 'dawdsl.std.unpack'
} }


---

local self = {}

---

function self._number_iterator(x, y, z)
    if dawdsl.std.type.are('unsigned_integer', x, 'nil', y, 'nil', z) then
        return self._number_iterator(0, x)
    elseif dawdsl.std.type.are('number', x, 'unsigned_integer', y, 'nil', z) then
        return self._number_iterator(x, y, 1)
    elseif dawdsl.std.type.are('number', x, 'unsigned_integer', y, 'number', z) then
        return self._number_iterator(x, y, dawdsl.std.array(z))
    else
        assert(dawdsl.std.type.are('number', x, 'unsigned_integer', y, 'array', z))
    end
    local index = x
    local size = y
    local step = z
    local counter = 0
    local length = dawdsl.std.size(step)
    return function() 
        if counter < size then
            -- index is the value here
            local result = {counter, index, index}
            index = index + step[index % length]
            counter = counter + 1
            return dawdsl.std.unpack(result)
        end
    end
end

---

function self._array_iterator(x, y, z, w)
    if dawdsl.std.type.are('array', x, 'nil', y, 'nil', z, 'nil', w) then
        return self._array_iterator(x, dawdsl.std.size(x))
    elseif dawdsl.std.type.are('array', x, 'unsigned_integer', y, 'nil', z, 'nil', w) then
        return self._array_iterator(x, 0, y)
    elseif dawdsl.std.type.are('array', x, 'number', y, 'unsigned_integer', z, 'nil', w) then
        return self._array_iterator(x, y, z, 1)
    elseif dawdsl.std.type.are('array', x, 'number', y, 'unsigned_integer', z, 'number', w) then
        return self._array_iterator(x, y, z, dawdsl.std.array(w))
    else
        assert(dawdsl.std.type.are('array', x, 'number', y, 'unsigned_integer', z, 'array', w))
    end
    local iterator = self._number_iterator(y, z, w) 
    local length = dawdsl.std.size(x)
    return function() 
        local counter, index = iterator()
        if (not dawdsl.std.type.is_nil(counter)) then
            return counter, x[index % length], index
        end
    end
end

---

function self._map_iterator(x, y, z, w)
    if dawdsl.std.type.are('map', x, 'nil', y, 'nil', z, 'nil', w) then
        return self._map_iterator(x, dawdsl.std.size(x))
    elseif dawdsl.std.type.are('map', x, 'unsigned_integer', y, 'nil', z, 'nil', w) then
        return self._map_iterator(x, 0, y)
    elseif dawdsl.std.type.are('map', x, 'number', y, 'unsigned_integer', z, 'nil', w) then
        return self._map_iterator(x, y, z, 1)
    elseif dawdsl.std.type.are('map', x, 'number', y, 'unsigned_integer', z, 'number', w) then
        return self._map_iterator(x, y, z, dawdsl.std.array(w))
    else
        assert(dawdsl.std.type.are('map', x, 'number', y, 'unsigned_integer', z, 'array', w))
    end
    local iterator = self._number_iterator(y, z, w) 
    local size = z
    local key = nil
    local i = 0
    return function() 
        local counter, index = iterator()
        if (not dawdsl.std.type.is_nil(counter)) then
            for k, v in next, x, key do
                if dawdsl.std.type.is_nil(k) then
                    k, v = next(t, nil)
                end
                if i == index then
                    key = k
                    i = i + 1
                    break
                end
                i = i + 1
            end
            return counter, x[key], key
        end
    end
end

---

function self._function_iterator(x, y, z, w)
    if dawdsl.std.type.are('function', x, 'unsigned_integer', y, 'nil', z, 'nil', w) then
        return self._function_iterator(x, 0, y)
    elseif dawdsl.std.type.are('function', x, 'number', y, 'unsigned_integer', z, 'nil', w) then
        return self._function_iterator(x, y, z, 1)
    elseif dawdsl.std.type.are('function', x, 'number', y, 'unsigned_integer', z, 'number', w) then
        return self._function_iterator(x, y, z, dawdsl.std.array(w))
    else
        assert(dawdsl.std.type.are('function', x, 'number', y, 'unsigned_integer', z, 'function', w))
    end
    local iterator = self._number_iterator(y, z, w) 
    return function() 
        local counter, argument = iterator()
        if (not dawdsl.std.type.is_nil(counter)) then
            return counter, x(argument), index
        else
            return nil
        end
    end
end

---

function self._simple_iterator(args)
    local first = args[1]
    assert(not dawdsl.std.type.is_nil(first))
    if dawdsl.std.type.is_number(first) then
        return self._number_iterator(dawdsl.std.unpack(args))
    elseif dawdsl.std.type.is_array(first) then
        return self._array_iterator(dawdsl.std.unpack(args))
    elseif dawdsl.std.type.is_map(first) then
        return self._map_iterator(dawdsl.std.unpack(args))
    elseif dawdsl.std.type.is_function(first) then
        return self._function_iterator(dawdsl.std.unpack(args))
    else
        error()
    end
end

---

function self._is_iterable(x)
    assert(not dawdsl.std.type.is_nil(x))
    return dawdsl.std.type.is_function(x) or dawdsl.std.type.is_map(x) or dawdsl.std.type.is_array(x)
end

function self._iterable_iterator(x, y, z, w, v)
    local iterator = self._simple_iterator(y, z, w, v) 
    return function() 
        local counter, index_key_or_argument = iterator()
        if (not dawdsl.std.type.is_nil(counter)) then
            if dawdsl.std.type.is_array(x) or dawdsl.std.type.is_map(x) then
                value = x[index_or_key_or_argument]
            elseif dawdsl.std.type.is_function(x) then
                value = x(index_or_key_or_argument)
            else
                error()
            end
            local result = {counter, value, index_or_key_or_argument}
            return dawdsl.std.unpack(result)
        end
    end
end

---

function self._complex_iterator(args)
    local second = args[2]
    if self._is_iterable(second) then
        return self._iterable_iterator(dawdsl.std.unpack(args))
    else
        return self._simple_iterator(dawdsl.std.unpack(args))
    end
end

---

function self.iterator(...)
    local args = {...}
    assert(not dawdsl.std.type.is_nil(args))
    assert(not (dawdsl.std.size(args) == 0))
    if dawdsl.std.size(args) == 1 then
        return self._simple_iterator(args)
    else
        return self._complex_iterator(args)
    end
end

---

return self.iterator
