local kikito = { inspect = require 'kikito.inspect.lua.inspect' }

local self = {}

function self.tostring(object, pretty_print)
    pretty_print = pretty_print or false
    if not pretty_print then
        return kikito.inspect(object, {indent = "", newline = ""})
    else
        return kikito.inspect(object)
    end
end

return self.tostring