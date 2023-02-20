local dawdsl = { std = require 'dawdsl.std' }

local self = {}

function self.compiler(modules)
    return dawdsl.std.compiler(
        modules, 
        'dawdsl.renoiselang.compiler.module.default',
        'dawdsl.renoiselang.compiler.module.duration',
        'dawdsl.renoiselang.compiler.module.expand',
        'dawdsl.renoiselang.compiler.module.javascript',
        'dawdsl.renoiselang.compiler.module.renoiselang'
    )
end

return self.compiler