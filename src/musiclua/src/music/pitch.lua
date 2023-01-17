local std = require 'std'

local self = {}

function self._get_pitch_class_name_at_index(index)
    local pitch_classes = { [0] = "C-", "C#", "D-", "D#", "E-", "F-", "F#", "G-", "G#", "A-", "A#", "B-" }
    return pitch_classes[index % (#pitch_classes + 1)]
end

function self._get_pitch_class_name_at_pitch_offset(root_pitch_class, pitch_offset)
    return self._get_pitch_class_at_index(root_pitch_class + pitch_offset)
end

function self._get_pitch_offset_at_scale_degree(scale, scale_degree)
    local pitch_offset = 0
    if (scale_degree == 0) then return 0 end
    for i = 0, scale_degree - 1 do
        pitch_offset = pitch_offset + scale[i % (#scale + 1)]
    end
    return pitch_offset
end

function self._get_octave_at_pitch_offset(root_octave, pitch_offset, pitches_per_octave)
    pitches_per_octave = pitches_per_octave or 12
    return root_octave + math.floor(pitch_offset / pitches_per_octave)
end

function self.get_diatonic_scale_mode()
    return {
        IONIAN = 0,
        DORIAN = 1,
        PHRYGIAN = 2,
        LYDIAN = 3,
        MIXOLYDIAN = 4,
        AEOLIAN = 5,
        LOCRIAN = 6
    }
end

function self.get_scale_intervals_at_mode(scale, mode)
    return std.shift(scale, mode) 
end

function self.get_diatonic_scale_intervals()
    local diatonic_scale_intervals = { [0] = 2, 2, 1, 2, 2, 2, 1 }
    return diatonic_scale_intervals
end

function self.get_pitch_name(root_pitch_class_or_special_string, scale, scale_degree, root_octave, pitch_offset)
    if type(root_pitch_class_or_special_string) == "string" then
        return root_pitch_class_or_special_string
    end
    local root_pitch_class = root_pitch_class_or_special_string
    local pitch_offset = self._get_pitch_offset_at_scale_degree(scale, scale_degree) + (pitch_adjustment or 0)
    local pitch_class = self._get_pitch_class_name_at_pitch_offset(root_pitch_class, pitch_offset)
    local octave = self._get_octave_at_pitch_offset(root_octave, pitch_offset)
    return pitch_class .. octave
end

return std.export(self)