local dawdsl = { std = require 'dawdsl.std' }

class = class or function() end

class "Socket"
    Socket = Socket or {}
    function Socket:__init(server_port, callback)
        local server, socket_error = renoise.Socket.create_server(server_port)
        if socket_error then 
            dawdsl.std.log.error({server_port = server_port, server = server, socket_error = socket_error})
        else
            dawdsl.std.log.info({server_port = server_port, server = server, socket_error = socket_error})
            self.callback = callback
            self.server = server
            self.server:run(self)
        end
    end

    function Socket:socket_error(socket_error)
            dawdsl.std.log.error({socket_error = socket_error})
    end
    
    function Socket:socket_accepted(socket)
            dawdsl.std.log.info({socket = socket})
    end

    function Socket:socket_message(socket, message)
        dawdsl.std.log.info({socket = socket, message = message})
        return self.callback(message)
    end

local self = {}

function self.server(server_port, callback)
    return Socket(server_port, callback)
end

return self.server