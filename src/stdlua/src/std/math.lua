local std = {
    type = require 'std.type',
    foreach = require 'std.foreach',
    export = require 'std.export'
}

local self = {}

---

function self._call_on_number_or_array(f, xs)
    if std.type.is_array(xs) then
        std.foreach(
            function(i, x) 
                xs[i] = f(x)
            end,
            xs
        )
        return xs
    else
        assert(std.type.is_number(xs))
        return f(xs)
    end
end

---

function self.floor(x)
    assert(std.type.is_number(x) or std.type.is_array(x))
    local f = math.floor(x)
    return self._call_on_number_or_array(f, x)
end

function self.ceil(x)
    assert(std.type.is_number(x) or std.type.is_array(x))
    local f = math.ceil
    return self._call_on_number_or_array(f, x)
end

function self.round(x)
    assert(std.type.is_number(x) or std.type.is_array(x))
    local f = function(x) return math.floor(x + 0.5) end
    return self._call_on_number_or_array(f, x)
end

function self.normalize(x, y_max, y_min, x_max, x_min)
    y_max = y_max or 1
    y_min = y_min or 0
    x_max = x_max or 1
    x_min = x_min or x_max * -1
    assert(not std.type.is_nil(x))
    assert(std.type.is_number(x) or std.type.is_array(x))
    assert(std.type.is_number(y_max) or std.type.is_array(y_max))
    assert(std.type.is_number(y_min) or std.type.is_array(y_min))
    assert(std.type.is_number(x_max) or std.type.is_array(x_max))
    assert(std.type.is_number(x_min) or std.type.is_array(x_min))
    assert(y_min < y_max)
    assert(x_min < y_max)
    -- scale values in old range to new range
    local f = function(x) return (y_max - y_min) * ((x - x_min) / (x_max - x_min)) + y_min end
    return self._call_on_number_or_array(f, x)
end

---

function self.sin_wave_function(period, amplitude, horizontal_shift, vertical_shift)
    -- see https://www.mathsisfun.com/algebra/amplitude-period-frequency-phase-shift.html
    -- return a sin wave function, note that horizontal_shift positive values shift left
    local p = period or math.pi * 2
    local a = amplitude or 1
    local h = horizontal_shift or 0
    local v = vertical_shift or 0
    return function(x) return a * math.sin((math.pi / p) * (x + h)) + v end
end

function self.triangle_wave_function(period, amplitude, horizontal_shift, vertical_shift)
    -- https://en.wikipedia.org/wiki/Triangle_wave
    local p = period or math.pi * 2
    local a = amplitude or 1
    -- TODO: is horizontal shift correct here?
    local h = horizontal_shift or 0
    local v = vertical_shift or 0
    return function(x) return 4 * a / p * math.abs((((x - (p / 4 + h)) % p) + p) % p - p / 2) - (a + v) end
end

---

return std.export(self)