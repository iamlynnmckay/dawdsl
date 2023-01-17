local std = require 'std'

local self = {}

--
-- Javascript module, allows execution of javascript code as part of compilation.
--
-- Syntax:
-- 
-- { "_javscript": { ( text="<function>" | file="<path>" ), argument=<argument> } }
-- 
-- Semantics:
-- 
-- Evaluate "<function>" or "<function>" in file at "<path>" with the given argument,
-- where the "<function>" is valid Javascript code.
--


function self._evaluate_javascript(object)
    return std.visitor(
        object, 
        function(object) 
            local result = object
            if std.type.is_map(object) then
                for k, v in pairs(object) do
                    if k == "_javascript" then
                        assert(next(object, k) == nil)
                        if v.path ~= nil then
                            assert(v['function'] == nil)
                            v['function'] = std.file.tostring(v.path)
                        end
                        assert(v['function'] ~= nil)
                        return std.javascript(v['function'], v.argument)
                    end
                end
            end
            return result
        end
    )
end

function self.javascript(modules)
    modules.insert_after('evaluate_javascript', self._evaluate_javascript)
    return modules
end

return self.javascript