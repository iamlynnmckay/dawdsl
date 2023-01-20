local dawdsl = { std = { 
    foreach = require 'dawdsl.std.foreach', 
    orderedmap = require 'dawdsl.std.orderedmap' 
} }

local self = {}

function self.modules(module_names, modules)
    modules = modules or dawdsl.std.orderedmap()
    dawdsl.std.foreach(
        function(_, module_name)
            local module = require(module_name)
            modules = module(modules)
        end,
        module_names
    )
    return modules
end

return self.modules