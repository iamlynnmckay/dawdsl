///
class Pitch {
  private static pitch_class_name_at_index(
    index: number,
    pitch_class_names: string[]
  ) {
    return pitch_class_names[index % pitch_class_names.length];
  }

  private static pitch_class_name_at_pitch_offset(
    root_pitch_class: number,
    pitch_offset: number,
    pitch_class_names: string[]
  ) {
    return Pitch.pitch_class_name_at_index(
      root_pitch_class + pitch_offset,
      pitch_class_names
    );
  }

  private static pitch_offset_at_scale_degree(
    scale: number[],
    scale_degree: number
  ) {
    let pitch_offset = 0;
    if (scale_degree == 0) {
      return 0;
    }
    for (let i = 0; i < scale_degree; ++i) {
      pitch_offset = pitch_offset + scale[i % scale.length];
    }
    return pitch_offset;
  }

  private static octave_at_pitch_offset(
    root_octave: number,
    pitch_offset: number,
    pitches_per_octave: number
  ) {
    pitches_per_octave = pitches_per_octave || 12;
    return root_octave + Math.floor(pitch_offset / pitches_per_octave);
  }

  private static scale_intervals_at_mode(
    scale_intervals: number[],
    mode: number
  ) {
    const scale_intervals_at_mode = Array(scale_intervals.length);
    for (let i = 0; i < scale_intervals.length; i++) {
      scale_intervals_at_mode[i] =
        scale_intervals[(i + mode) % scale_intervals.length];
    }
    return scale_intervals_at_mode;
  }

  private static pitch_name(
    scale_intervals: number[],
    pitch_class_names: string[],
    scale_mode: number,
    root_pitch_class: number,
    root_octave: number,
    scale_degree: number,
    pitch_adjustment: number
  ) {
    scale_intervals = Pitch.scale_intervals_at_mode(
      scale_intervals,
      scale_mode
    );
    const pitch_offset =
      Pitch.pitch_offset_at_scale_degree(scale_intervals, scale_degree) +
      (pitch_adjustment || 0);
    const octave = Pitch.octave_at_pitch_offset(
      root_octave,
      pitch_offset,
      scale_intervals.length
    );
    const pitch_class = Pitch.pitch_class_name_at_pitch_offset(
      root_pitch_class,
      pitch_offset,
      pitch_class_names
    );
    return pitch_class + octave;
  }

  ///

  private static relative_diatonic_scale_intervals(): number[] {
    return [2, 2, 1, 2, 2, 2, 1];
  }

  private static diatonic_pitch_class_names(): string[] {
    return [
      "C-",
      "C#",
      "D-",
      "D#",
      "E-",
      "F-",
      "F#",
      "G-",
      "G#",
      "A-",
      "A#",
      "B-",
    ];
  }

  private static diatonic_pitch_name(
    scale_mode: number,
    root_pitch_class: number,
    root_octave: number,
    scale_degree: number,
    pitch_adjustment: number
  ) {
    return Pitch.pitch_name(
      Pitch.relative_diatonic_scale_intervals(),
      Pitch.diatonic_pitch_class_names(),
      root_pitch_class,
      scale_mode,
      scale_degree,
      root_octave,
      pitch_adjustment
    );
  }

  ///

  private static diatonic_pitch_constants(): { [_: string]: number } {
    return {
      tonic: 0,
      supertonic: 2,
      mediant: 4,
      subdominant: 5,
      dominant: 7,
      submediant: 9,
      leading_tone: 11,
      leading_note: 11,
      subtonic: 11,
      octave: 12,
      //
      root: 0,
      major_second: 2,
      major_third: 4,
      perfect_fourth: 5,
      perfect_fifth: 7,
      major_sixth: 9,
      major_seventh: 11,
      //
      do: 0,
      re: 2,
      mi: 4,
      fa: 5,
      so: 7,
      la: 9,
      ti: 11,
      //
      i: 0,
      ii: 2,
      iii: 4,
      iv: 5,
      v: 7,
      vi: 9,
      vii: 11,
      //
      first: 0,
      second: 2,
      third: 4,
      fourth: 5,
      fifth: 7,
      sixth: 9,
      seventh: 11,
      //
      major: 0,
      minor: 5,
      //
      ionian: 0,
      dorian: 1,
      phrygian: 2,
      lydian: 3,
      mixolydian: 4,
      aeolian: 5,
      locrian: 6,
      //
      raised: 1,
      sharp: 1,
      "#": 1,
      lowered: -1,
      flat: -1,
      b: -1,
      //
      Cb: 11,
      C: 0,
      "C#": 1,
      Db: 1,
      D: 2,
      "D#": 3,
      Eb: 3,
      E: 4,
      "E#": 5,
      Fb: 4,
      F: 5,
      "F#": 6,
      Gb: 6,
      G: 7,
      "G#": 8,
      Ab: 8,
      A: 9,
      "A#": 10,
      Bb: 10,
      B: 11,
      "B#": 0,
      //
      "1": 0,
      "2": 2,
      "3": 4,
      "4": 5,
      "5": 7,
      "6": 9,
      "7": 11,
    };
  }

  private static parse_diatonic_syntactic_sugar(
    syntactic_sugar: string
  ): string {
    syntactic_sugar = syntactic_sugar.toLowerCase();
    const pitch_constants = Pitch.diatonic_pitch_constants();
    const tokens = syntactic_sugar
      .split(".")
      .map((x) => Calculator.evaluate(x, pitch_constants));
    switch (tokens.length) {
      case 2:
        // <root_pitch_class>.<root_octave>
        return Pitch.diatonic_pitch_name(0, tokens[0], tokens[1], 0, 0);
      case 4:
        // <scale_mode>.<root_pitch_class>.<root_octave>.<scale_degree>
        return Pitch.diatonic_pitch_name(
          tokens[0],
          tokens[1],
          tokens[2],
          tokens[3],
          0
        );
      case 5:
        // <scale_mode>.<root_pitch_class>.<root_octave>.<scale_degree>.<pitch_adjustment>
        return Pitch.diatonic_pitch_name(
          tokens[0],
          tokens[1],
          tokens[2],
          tokens[3],
          tokens[4]
        );
      default:
        // @TODO: error
        return "";
    }
  }

  public static evaluate(syntactic_sugar: string): string {
    return Pitch.parse_diatonic_syntactic_sugar(syntactic_sugar);
  }
}

///
