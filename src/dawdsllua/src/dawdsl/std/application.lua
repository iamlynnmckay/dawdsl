local dawdsl = { std = {
    type = require 'dawdsl.std.type',
    json = require 'dawdsl.std.json',
    executor = require 'dawdsl.std.executor',
    file = require 'dawdsl.std.file'
} }

local self = {}

function self.application(message, client_function, server_function, default_address, default_port, default_modules)
    -- @@@TODO: fix this to allow for local execution, allow specification of modules by client also
    assert(not dawdsl.std.type.is_nil(message))
    assert(dawdsl.std.type.is_table(message))
    assert(not (message.server == nil and message.client == nil))
    if message.server ~= nil then
        message = message.server
        message.modules = message.modules or default_modules
        message.port = message.port or default_port
        self._callback = function(message) 
            return dawdsl.std.json.encode(dawdsl.std.executor(message.modules)(dawdsl.std.json.decode(message)))
        end
        return server_function(message.port, self._callback)
    end
    if message.client ~= nil then
        message = message.client
        if dawdsl.std.type.is_string(message.program) then
            message.program = dawdsl.std.file.tostring(message.program)
            message.program = dawdsl.std.json.decode(message.program)
        end
        message.program = dawdsl.std.json.encode(message.program)
        message.address = message.address or default_address
        message.port = message.port or default_port
        if (message.localhost) then
            return dawdsl.std.json.encode(dawdsl.std.executor(message.modules or default_modules)(dawdsl.std.json.decode(message.program)))
        else
            return client_function(message.address, message.port, message.program)
        end
    end
end

return self.application