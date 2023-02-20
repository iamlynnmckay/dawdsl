local dawdsl = { std = { 
    modules = require 'dawdsl.std.modules' 
} }

local self = {}

function self.executor(module_names) 
    local modules = dawdsl.std.modules(module_names)
    return function(program) 
        modules.forward_iterator(
            function(module_name, module)
                program = module(program)
                return program
            end
        )
        return program
    end
end

return self.executor