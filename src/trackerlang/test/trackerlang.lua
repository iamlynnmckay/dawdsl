local trackerlang = require 'trackerlang'
local std = require 'std'

local compiler = trackerlang.compiler()

std.foreach(
    function(_, name) 
        local test = {
            name = name,
            input = std.json.decode(std.file.tostring("test/" .. name .. "/input.json")),
            expected = std.json.decode(std.file.tostring("test/" .. name .. "/output.json")),
        }
        test.actual = std.executor(std.array('trackerlang.compiler'))(test.input)
        test.error = not std.equals(test.expected, test.actual)
        if test.error then
            std.log.debug(test)
            os.exit(1)
        end
    end,
    std.string.split(std.file.tostring("test/test.txt"))
)

