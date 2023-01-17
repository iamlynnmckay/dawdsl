local std = {
    export = require 'std.export'
}

local self = {}

function self.tostring(path)
    local file = assert(io.open(path, "r"))
    local str = file:read("*all")
    file:close()
    return str
end

return std.export(self)