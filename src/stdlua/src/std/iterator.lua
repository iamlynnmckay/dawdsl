local std = {
    type = require 'std.type',
    array = require 'std.array',
    size = require 'std.size'
}
local unpack = unpack or table.unpack

---

local self = {}

---

function self._number_iterator(x, y, z)
    if std.type.are('unsigned_integer', x, 'nil', y, 'nil', z) then
        return self._number_iterator(0, x)
    elseif std.type.are('number', x, 'unsigned_integer', y, 'nil', z) then
        return self._number_iterator(x, y, 1)
    elseif std.type.are('number', x, 'unsigned_integer', y, 'number', z) then
        return self._number_iterator(x, y, std.array(z))
    else
        assert(std.type.are('number', x, 'unsigned_integer', y, 'array', z))
    end
    local index = x
    local size = y
    local step = z
    local counter = 0
    local length = std.size(step)
    return function() 
        if counter < size then
            -- index is the value here
            local result = {counter, index, index}
            index = index + step[index % length]
            counter = counter + 1
            return unpack(result)
        end
    end
end

---

function self._array_iterator(x, y, z, w)
    if std.type.are('array', x, 'nil', y, 'nil', z, 'nil', w) then
        return self._array_iterator(x, std.size(x))
    elseif std.type.are('array', x, 'unsigned_integer', y, 'nil', z, 'nil', w) then
        return self._array_iterator(x, 0, y)
    elseif std.type.are('array', x, 'number', y, 'unsigned_integer', z, 'nil', w) then
        return self._array_iterator(x, y, z, 1)
    elseif std.type.are('array', x, 'number', y, 'unsigned_integer', z, 'number', w) then
        return self._array_iterator(x, y, z, std.array(w))
    else
        assert(std.type.are('array', x, 'number', y, 'unsigned_integer', z, 'array', w))
    end
    local iterator = self._number_iterator(y, z, w) 
    local length = std.size(x)
    return function() 
        local counter, index = iterator()
        if (not std.type.is_nil(counter)) then
            return counter, x[index % length], index
        end
    end
end

---

function self._map_iterator(x, y, z, w)
    if std.type.are('map', x, 'nil', y, 'nil', z, 'nil', w) then
        return self._map_iterator(x, std.size(x))
    elseif std.type.are('map', x, 'unsigned_integer', y, 'nil', z, 'nil', w) then
        return self._map_iterator(x, 0, y)
    elseif std.type.are('map', x, 'number', y, 'unsigned_integer', z, 'nil', w) then
        return self._map_iterator(x, y, z, 1)
    elseif std.type.are('map', x, 'number', y, 'unsigned_integer', z, 'number', w) then
        return self._map_iterator(x, y, z, std.array(w))
    else
        assert(std.type.are('map', x, 'number', y, 'unsigned_integer', z, 'array', w))
    end
    local iterator = self._number_iterator(y, z, w) 
    local size = z
    local key = nil
    local i = 0
    return function() 
        local counter, index = iterator()
        if (not std.type.is_nil(counter)) then
            for k, v in next, x, key do
                if std.type.is_nil(k) then
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
    if std.type.are('function', x, 'unsigned_integer', y, 'nil', z, 'nil', w) then
        return self._function_iterator(x, 0, y)
    elseif std.type.are('function', x, 'number', y, 'unsigned_integer', z, 'nil', w) then
        return self._function_iterator(x, y, z, 1)
    elseif std.type.are('function', x, 'number', y, 'unsigned_integer', z, 'number', w) then
        return self._function_iterator(x, y, z, std.array(w))
    else
        assert(std.type.are('function', x, 'number', y, 'unsigned_integer', z, 'function', w))
    end
    local iterator = self._number_iterator(y, z, w) 
    return function() 
        local counter, argument = iterator()
        if (not std.type.is_nil(counter)) then
            return counter, x(argument), index
        else
            return nil
        end
    end
end

---

function self._simple_iterator(args)
    local first = args[1]
    assert(not std.type.is_nil(first))
    if std.type.is_number(first) then
        return self._number_iterator(unpack(args))
    elseif std.type.is_array(first) then
        return self._array_iterator(unpack(args))
    elseif std.type.is_map(first) then
        return self._map_iterator(unpack(args))
    elseif std.type.is_function(first) then
        return self._function_iterator(unpack(args))
    else
        error()
    end
end

---

function self._is_iterable(x)
    assert(not std.type.is_nil(x))
    return std.type.is_function(x) or std.type.is_map(x) or std.type.is_array(x)
end

function self._iterable_iterator(x, y, z, w, v)
    local iterator = self._simple_iterator(y, z, w, v) 
    return function() 
        local counter, index_key_or_argument = iterator()
        if (not std.type.is_nil(counter)) then
            if std.type.is_array(x) or std.type.is_map(x) then
                value = x[index_or_key_or_argument]
            elseif std.type.is_function(x) then
                value = x(index_or_key_or_argument)
            else
                error()
            end
            local result = {counter, value, index_or_key_or_argument}
            return unpack(result)
        end
    end
end

---

function self._complex_iterator(args)
    local second = args[2]
    if self._is_iterable(second) then
        return self._iterable_iterator(unpack(args))
    else
        return self._simple_iterator(unpack(args))
    end
end

---

function self.iterator(...)
    local args = {...}
    assert(not std.type.is_nil(args))
    assert(not (std.size(args) == 0))
    if std.size(args) == 1 then
        return self._simple_iterator(args)
    else
        return self._complex_iterator(args)
    end
end

---

return self.iterator
