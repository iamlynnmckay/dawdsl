local std = require 'std'
local dawdsl = require 'dawdsl'

-- connect to server with defaults
local server_message = {}
server_message.server = {}

local server = dawdsl(server_message)

-- send example program to server with defaults
local client_message = {}
client_message.client = {}
client_message.client.program =  os.getenv("HOME").."/.config/Renoise/V3.4.2/Scripts/dawdsl/TestPad.json"

dawdsl(client_message)