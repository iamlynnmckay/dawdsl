local std = {
    popen = require 'std.popen',
    json = require 'std.json'
}

local self = {}

function self.javascript(program, argument)
    local command = "echo 'console.log(("..program..")("..std.json.encode(argument).."))' | node"
    local stdout = std.popen(command)
    local result = std.json.decode(stdout)
    return result
end

return self.javascript