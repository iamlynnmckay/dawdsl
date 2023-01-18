local std = require 'std'

class "Socket"
    function Socket:__init(server_port, callback)
        local server, socket_error = renoise.Socket.create_server(server_port)
        if socket_error then 
            std.log.error({server_port = server_port, server = server, socket_error = socket_error})
        else
            std.log.info({server_port = server_port, server = server, socket_error = socket_error})
            self.callback = callback
            self.server = server
            self.server:run(self)
        end
    end

    function Socket:socket_error(socket_error)
            std.log.error({socket_error = socket_error})
    end
    
    function Socket:socket_accepted(socket)
            std.log.info({socket = socket})
    end

    function Socket:socket_message(socket, message)
        std.log.info({socket = socket, message = message})
        return self.callback(message)
    end

local self = {}

function self.server(server_port, callback)
    return Socket(server_port, callback)
end

return self.server