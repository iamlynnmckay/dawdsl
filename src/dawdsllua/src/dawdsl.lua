local dawdsl = { std = require 'dawdsl.std' }

local self = {}

function self.dawdsl(message)
    return dawdsl.std.application(
        message, 
        require 'dawdsl.client',
        require 'dawdsl.server',
        "localhost",
        1234,
        dawdsl.std.array("dawdsl.renoiselang.compiler", "dawdsl.renoiselang.interpreter")
    )
end

return self.dawdsl