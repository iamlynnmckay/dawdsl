local std = require 'std'
local dawdsl = require 'dawdsl'

-- connect to server with defaults
local server_message = {}
server_message.server = {}

-- send example program to server with defaults
local client_message = {}
client_message.client = {}
client_message.client.program =  os.getenv("HOME").."/.config/Renoise/V3.4.2/Scripts/dawdsl/TestPad.json"
-- use local execution for now as client and server are not working together
client_message.client.localhost = true

-- sanity test
std.json.decode(std.json.encode(std.json.decode(std.file.tostring(client_message.client.program))))

local server = dawdsl(server_message)

dawdsl(client_message)