local std = { foreach = require 'std.foreach', orderedmap = require 'std.orderedmap' }

local self = {}

function self.modules(module_names, modules)
    modules = modules or std.orderedmap()
    std.foreach(
        function(_, module_name)
            local module = require(module_name)
            modules = module(modules)
        end,
        module_names
    )
    return modules
end

return self.modules