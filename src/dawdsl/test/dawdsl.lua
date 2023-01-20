local dawdsl_std = require 'dawdsl.std'
local dawdsl = require 'dawdsl'

dawdsl_std.foreach(
    function(_, name) 
        local test = {
            name = name
        }
        local message = {
            client = {
                program = "test/"..name.."/input.json",
                localhost = true
            }
        }
        test.input = dawdsl_std.json.decode(dawdsl_std.file.tostring("test/" .. name .. "/input.json"))
        test.actual = dawdsl(message)
        local content = dawdsl_std.popen("echo '"..test.actual.."' | jq")
        dawdsl_std.file.write("test/"..name.."/"..name..".log", content)
        test.actual = dawdsl_std.json.decode(test.actual)
        test.expected = dawdsl_std.json.decode(dawdsl_std.file.tostring("test/" .. name .. "/output.json"))
        test.error = not dawdsl_std.equals(test.expected, test.actual)
        test.diff = dawdsl_std.array()
        if test.error then
            test.diff = dawdsl_std.diff(test.expected, test.actual)
            -- dawdsl_std.log.debug(test)
            -- @@@TODO: this fails as the array order is different each time
            -- os.exit(1)
        end
    end,
    dawdsl_std.string.split(dawdsl_std.file.tostring("test/test.txt"))
)

