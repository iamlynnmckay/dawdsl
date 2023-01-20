local self = {}

function self.export(module)
    local result = {}
    for k, v in pairs(module) do
        if string.sub(k, 1, 1) ~= '_' then
            result[k] = v
        end
    end
    return result
end

return self.export
