local dawdsl = { std = {
    modules = require 'dawdsl.std.modules',
    array = require 'dawdsl.std.array',
} }

local self = {}

function self.compiler(modules, ...)
    modules = dawdsl.std.modules(
        dawdsl.std.array(...),
        modules
    )
    modules.insert_before('compiler', function(program) return program end)
    return modules
end

return self.compiler