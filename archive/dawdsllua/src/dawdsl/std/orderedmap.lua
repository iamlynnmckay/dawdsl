local self = {}

function self._insert_if_before_and_after_are_nil(table, key, value)
    local mt = getmetatable(table)
    assert(value ~= nil)
    mt.table[key] = { value = value }
    assert(mt.before == nil)
    assert(mt.after == nil)
    mt.before = key
    mt.after = key
    setmetatable(table, mt)
    return table
end

function self._insert_if_before_is_nil(table, key, value, after)
    local mt = getmetatable(table)
    assert(value ~= nil)
    mt.table[key] = { value = value }
    assert(after ~= nil)
    assert(mt.before ~= nil)
    assert(mt.after ~= nil)
    local before = mt.table[after].before
    if (before == nil) then
        assert(mt.after == after)
        mt.after = key
    else
        mt.table[before].after = key
    end
    mt.table[after].before = key
    mt.table[key].before = before
    mt.table[key].after = after
    setmetatable(table, mt)
    return table
end


function self._insert_if_after_is_nil(table, key, value, before)
    local mt = getmetatable(table)
    assert(value ~= nil)
    mt.table[key] = { value = value }
    assert(before ~= nil)
    assert(mt.after ~= nil)
    assert(mt.before ~= nil)
    local after = mt.table[before].after
    if (after == nil) then
        assert(mt.before == before)
        mt.before = key
    else
        mt.table[after].before = key
    end
    mt.table[before].after = key
    mt.table[key].after = after
    mt.table[key].before = before
    setmetatable(table, mt)
    return table
end


function self._insert_if_before_and_after_are_not_nil(table, key, value, after)
    local mt = getmetatable(table)
    assert(value ~= nil)
    mt.table[key] = { value = value }
    assert(before ~= nil)
    assert(after ~= nil)
    assert(mt.before ~= nil)
    assert(mt.after ~= nil)
    mt.table[key].before = before
    mt.table[key].after = after
    mt.table[before].after = key
    mt.table[after].before = key
    setmetatable(table, mt)
    return table
end

function self._insert_between(table, key, value, before, after)
    if (before == nil and after == nil) then
        return self._insert_if_before_and_after_are_nil(table, key, value)
    elseif (before == nil) then
        return self._insert_if_before_is_nil(table, key, value, after)
    elseif (after == nil) then
        return self._insert_if_after_is_nil(table, key, value, before)
    else
        return self._insert_if_before_and_after_are_not_nil(table, key, value, before, after)
    end
end

function self._insert_before(table, key, value, after)
    local before = nil
    if after == nil then
        before = getmetatable(table).before
    end
    return self._insert_between(table, key, value, before, after)
end

function self._insert_after(table, key, value, before)
    local after = nil
    if before == nil then
        after = getmetatable(table).after
    end
    return self._insert_between(table, key, value, before, after)
end

function self._at(table, key)
    local mt = getmetatable(table)
    assert(mt ~= nil)
    local element = mt.table[key]
    assert(element ~= nil)
    local value = element.value
    assert(value ~= nil)
    return value
end

function self._forward_iterator(table, callback, key)
    local mt = getmetatable(table)
    assert(mt ~= nil)
    assert(mt.before ~= nil)
    assert(mt.after ~= nil)
    key = key or mt.after
    local element = mt.table[key]
    assert(element ~= nil)
    local value = element.value
    assert(value ~= nil)
    callback(key, value)
    if key == mt.before then
        return
    else
        key = mt.table[key].after
    end
    self._forward_iterator(table, callback, key)
end

function self._backward_iterator(table, callback, key)
    local mt = getmetatable(table)
    if mt.before == nil or mt.after == nil then
        return
    end
    key = key or mt.before
    ---
    callback(key, mt.table[key].value)
    if key == mt.after then
        return
    end
    self._backward_iterator(table, callback, mt.table[key].before)
end

function self.orderedmap() 
    local table = {}
    table.insert_before = function(key, value, before) return self._insert_before(table, key, value, before) end
    table.insert_after = function(key, value, after) return self._insert_after(table, key, value, after) end
    table.forward_iterator = function(callback, key) return self._forward_iterator(table, callback, key) end
    table.backward_iterator = function(callback, key) return self._backward_iterator(table, callback, key) end
    table.at = function(key) return self._at(table, key) end
    local metatable = {
        before = nil,
        after = nil,
        table = {}
    }
    setmetatable(table, metatable)
    return table
end

return self.orderedmap