local std = {
    type = require 'std.type',
    json = require 'std.json',
    executor = require 'std.executor',
    file = require 'std.file'
}

local self = {}

function self.application(message, client_function, server_function, default_address, default_port, default_modules)
    assert(not std.type.is_nil(message))
    assert(std.type.is_table(message))
    assert(not (message.server == nil and message.client == nil))
    if message.server ~= nil then
        message = message.server
        message.modules = message.modules or default_modules
        local callback = std.executor(message.modules)
        message.port = message.port or default_port
        return server_function(message.port, callback)
    end
    if message.client ~= nil then
        message = message.client
        if std.type.is_string(message.program) then
            message.program = std.file.tostring(message.program)
        else 
            message.program = std.json.encode(message.program)
        end
        message.address = message.address or default_address
        message.port = message.port or default_port
        return client_function(message.address, message.port, message.program)
    end
end

return self.application