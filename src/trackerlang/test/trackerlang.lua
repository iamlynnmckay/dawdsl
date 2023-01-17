local trackerlang = require 'trackerlang'
local std = require 'std'

local compiler = trackerlang.compiler()

function os.capture(cmd)
    -- stolen from https://gist.github.com/dukeofgaming/453cf950abd99c3dc8fc
    local handle = assert(io.popen(cmd, 'r'))
    local output = assert(handle:read('*a'))
    handle:close()
    return output
end

std.foreach(
    function(_, name) 
        local test = {
            name = name
        }
        test.input = std.json.decode(std.file.tostring("test/" .. name .. "/input.json"))
        test.actual = std.executor(std.array('trackerlang.compiler'))(test.input)
        local fd = io.open("test/"..name.."/"..name..".log", "w")
        fd:write(os.capture("echo '"..std.json.encode(test.actual).."' | jq"))
        fd:close()
        test.expected = std.json.decode(std.file.tostring("test/" .. name .. "/output.json"))
        test.error = not std.equals(test.expected, test.actual)
        if test.error then
            std.log.debug(test)
            os.exit(1)
        end
    end,
    std.string.split(std.file.tostring("test/test.txt"))
)

