local dawdsl = { 
    std = require 'dawdsl.std'
}

local self = {}

function self.interpreter(modules)
    return dawdsl.std.interpreter(modules, 'dawdsl.renoiselang.interpreter.renoise')
end

return self.interpreter