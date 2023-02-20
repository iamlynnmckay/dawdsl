local dawdsl = { std = {
    foreach = require 'dawdsl.std.foreach',
    unpack = require 'dawdsl.std.unpack',
    size = require 'dawdsl.std.size',
    tostring = require 'dawdsl.std.tostring',
} } 


local self = {}

function self._interpret(program, package) 
    local table = require(package)
    for j = 0, #program do
        local v = program[j]
        if dawdsl.std.size(v) ~= 0 then
            local key = v[0]
            local value = v[1]
            local f = table
            for i = 0, #key do
                f = f[key[i]]
            end
            f(dawdsl.std.unpack(value))
        end
    end
    return program
end

function self.interpreter(modules, package)
    modules.insert_before('interpreter', function(program) return self._interpret(program, package) end)
    return modules
end

return self.interpreter
