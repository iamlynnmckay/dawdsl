local dawdsl = { std = require 'dawdsl.std' }

local self = {}

function self._create_client(server_address, server_port)
    return renoise.Socket.create_client(server_address, server_port)
end

function self._send(client, message)
    return client:send(dawdsl.std.json.encode(message))
end

function self._receive(client)
    return client:receive("*all", 1000) 
end

function self.client(server_address, server_port, request)
    server_address = server_address
    server_port = server_port
    local client = self._create_client(server_address, server_port)
    local response, error_message = self._send(client, request)
    if not response then
        dawdsl.std.log.error({request = request, client = client, response = response, error_message = error_message})
        return
    end
    local response, error_message = self._receive(client)
    if not response then
        dawdsl.std.log.error({request = request, client = client, response = response, error_message = error_message})
    end
    dawdsl.std.log.info({request = request, client = client, response = response, error_message = error_message})
end

return self.client