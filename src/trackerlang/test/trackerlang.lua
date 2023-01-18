local trackerlang = require 'trackerlang'
local std = require 'std'

local compiler = trackerlang.compiler()

std.foreach(
    function(_, name) 
        local test = {
            name = name
        }
        test.input = std.json.decode(std.file.tostring("test/" .. name .. "/input.json"))
        test.actual = std.executor(std.array('trackerlang.compiler'))(test.input)
        test.actual = std.json.decode(std.json.encode(test.actual))
        std.file.write(
            "test/"..name.."/"..name..".log",
            std.popen("echo '"..std.json.encode(test.actual).."' | jq")
        )
        test.expected = std.json.decode(std.file.tostring("test/" .. name .. "/output.json"))
        test.error = not std.equals(test.expected, test.actual)
        if test.error then
            local diff = std.diff(test.expected, test.actual)
            std.log.debug(diff)
            --std.log.debug(test)
            os.exit(1)
        end
    end,
    std.string.split(std.file.tostring("test/test.txt"))
)

