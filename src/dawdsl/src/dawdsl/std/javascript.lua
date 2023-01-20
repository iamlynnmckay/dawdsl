local dawdsl = { std = {
    popen = require 'dawdsl.std.popen',
    json = require 'dawdsl.std.json'
} }

local self = {}

function self.javascript(program, argument)
    local command = "echo 'console.log(JSON.stringify(("..program..")("..dawdsl.std.json.encode(argument)..")))' | node"
    local stdout = dawdsl.std.popen(command)
    local result = dawdsl.std.json.decode(dawdsl.stdout)
    return result
end

return self.javascript