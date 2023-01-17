local std = require 'std'

local self = {}

function self.compiler(modules)
    modules = std.modules(
        std.array(
            'trackerlang.builtin.default',
            'trackerlang.builtin.duration',
            'trackerlang.builtin.expand'
        ),
        modules
    )
    modules.insert_before('compiler', function(program) return program end)
    return modules
end

return self.compiler