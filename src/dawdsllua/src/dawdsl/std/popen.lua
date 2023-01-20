local self = {}

function self.popen(command)
    local handle = assert(io.popen(command, 'r'))
    local stdout = assert(handle:read('*a'))
    handle:close()
    return stdout
end

return self.popen