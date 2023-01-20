local self = {}

function self.has(xs, k)
    return not xs[k] == nil
end

return self.has

