() => {

function _get_pitch_class_name_at_index(index) {
    let pitch_classes = [ "C-", "C#", "D-", "D#", "E-", "F-", "F#", "G-", "G#", "A-", "A#", "B-" ]
    return pitch_classes[index % pitch_classes.length]
}

function _get_pitch_class_name_at_pitch_offset(root_pitch_class, pitch_offset) {
    return _get_pitch_class_name_at_index(root_pitch_class + pitch_offset)
}

function _get_pitch_offset_at_scale_degree(scale, scale_degree) {
    let pitch_offset = 0
    if (scale_degree == 0) { return 0 }
    for (i = 0; i < scale_degree; ++i) {
        pitch_offset = pitch_offset + scale[i % scale.length]
    }
    return pitch_offset
}

function _get_octave_at_pitch_offset(root_octave, pitch_offset, pitches_per_octave) {
    pitches_per_octave = pitches_per_octave || 12
    return root_octave + Math.floor(pitch_offset / pitches_per_octave)
}

function get_diatonic_scale_mode() {
    return {
        IONIAN: 0,
        DORIAN: 1,
        PHRYGIAN: 2,
        LYDIAN: 3,
        MIXOLYDIAN: 4,
        AEOLIAN: 5,
        LOCRIAN: 6
    }
}

function get_scale_intervals_at_mode(scale_intervals, mode) {
    let scale_intervals_at_mode = Array(scale_intervals.length)
    for (let i = 0; i < scale_intervals.length; i++) {
        scale_intervals_at_mode[(i + mode) % scale_intervals.length]
    }
    return scale_intervals_at_mode
}

function get_diatonic_scale_intervals() {
    let diatonic_scale_intervals = [ 2, 2, 1, 2, 2, 2, 1 ]
    return diatonic_scale_intervals
}

function get_pitch_name(root_pitch_class_or_special_string, scale_intervals, scale_degree, root_octave, pitch_adjustment) {
    if (typeof(root_pitch_class_or_special_string) == "string") {
        return root_pitch_class_or_special_string
    }
    let root_pitch_class = root_pitch_class_or_special_string
    let pitch_offset = _get_pitch_offset_at_scale_degree(scale_intervals, scale_degree) + (pitch_adjustment || 0)
    let pitch_class = _get_pitch_class_name_at_pitch_offset(root_pitch_class, pitch_offset)
    let octave = _get_octave_at_pitch_offset(root_octave, pitch_offset)
    return pitch_class + octave
}

function get_major_scale(root) {
    let major_scale_intervals = get_scale_intervals_at_mode(get_diatonic_scale_intervals(), get_diatonic_scale_mode().IONIAN)
    for (let scale_degree = 0; scale_degree < 8; scale_degree++) {
       major_scale_intervals[scale_degree] = get_pitch_name(root, major_scale_intervals, scale_degree, 4, 0)
    }
    return major_scale_intervals
}

return get_major_scale(0)

}