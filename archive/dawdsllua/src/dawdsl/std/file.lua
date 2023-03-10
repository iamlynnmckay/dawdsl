local dawdsl = { std = {
    export = require 'dawdsl.std.export'
} }

local self = {}

function self.tostring(path)
    local file = assert(io.open(path, "r"))
    local str = file:read("*all")
    file:close()
    return str
end

function self.write(path, content)
    local file = io.open(path, "w")
    file:write(content)
    file:close()
end

return dawdsl.std.export(self)