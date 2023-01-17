local std = require 'std'

local self = {}

function self.dawdsl(message)
    return std.application(
        message, 
        require 'dawdsl.client',
        require 'dawdsl.server',
        "localhost",
        1234,
        std.array("trackerlang.compiler", "renoiselang.interpreter")
    )
end

return self.dawdsl