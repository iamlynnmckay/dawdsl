local std = { 
    tostring = require 'std.tostring',
    export = require 'std.export'
}

---

local self = {
    ALL = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
    FATAL = 5
}

---

self._log_level = self.DEBUG

function self.get()
    return self._log_level
end

function self.set(level)
    self._log_level = level
end

---

function self._tostring(object) 
    return std.tostring(object)
end

function self._tostring_pretty_print(object)
    return std.tostring(object, true)
end

function self._wrap_log_function(log_level_name, tostring_function)
    return function(object)
        local message = {}
        if self.get() <= self.DEBUG then
            message = debug.getinfo(2)
        end
        message['<object>'] = object
        if (self.get() >= self[log_level_name]) then
            print(log_level_name .. ' ' ..tostring_function(message))
        end
    end
end

self.debug = self._wrap_log_function('DEBUG', self._tostring_pretty_print)

self.info = self._wrap_log_function('INFO', self._tostring)

self.warn = self._wrap_log_function('WARN', self._tostring)

self.error = self._wrap_log_function('ERROR', self._tostring)

self.fatal = self._wrap_log_function('FATAL', self._tostring)

---

return std.export(self)