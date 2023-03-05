import * as std from "../../../std";
import { Assert } from "../../../std/Assert";

export class Duration {
  private static get_number_of_beats_per_pattern(
    lines_per_pattern: number,
    lines_per_beat: number
  ): number {
    return lines_per_pattern / lines_per_beat;
  }

  private static get_absolute_line_plus_number_of_beats(
    lines_per_beat: number,
    absolute_line: number,
    number_of_beats: number
  ): number {
    return absolute_line + number_of_beats * lines_per_beat;
  }

  private static get_number_of_lines_per_number_of_beats(
    lines_per_pattern: number,
    lines_per_beat: number,
    number_of_beats: number
  ): number {
    return std.Math.normalize(
      number_of_beats,
      lines_per_pattern,
      0,
      this.get_number_of_beats_per_pattern(lines_per_pattern, lines_per_beat),
      0
    ) as number;
  }

  private static get_number_of_patterns_per_absolute_line(
    lines_per_pattern: number,
    absolute_line: number
  ): number {
    // this is how many patterns we need at the current line
    return Math.ceil(absolute_line / lines_per_pattern);
  }

  private static get_relative_line(
    lines_per_pattern: number,
    absolute_line: number
  ): number {
    return absolute_line % lines_per_pattern;
  }

  private static get_absolute_line(
    lines_per_pattern: number,
    pattern: number,
    relative_line: number
  ): number {
    return pattern * lines_per_pattern + relative_line;
  }
  ///
  ///

  private static dotted_value_constants(): { [_: string]: number } {
    return {
      //
      dotted: 1,
      double_dotted: 2,
      tripple_dotted: 3,
    };
  }

  private static note_value_constants(): { [_: string]: number } {
    return {
      //
      large: 8,
      duplex: 8,
      maxima: 8,
      octuple_note: 8,
      octuple_whole_note: 8,
      //
      long: 4,
      longa: 4,
      quadruple_note: 4,
      quadruple_whole_note: 4,
      //
      double_whole_note: 2,
      double_note: 2,
      breve: 2,
      //
      whole_note: 1,
      semibreve: 1,
      //
      half_note: 1 / 2,
      minim: 1 / 2,
      //
      quarter_note: 1 / 4,
      crotchet: 1 / 4,

      //
      eighth_note: 1 / 8,
      quaver: 1 / 8,

      //
      sixteenth_note: 1 / 16,
      semiquaver: 1 / 16,

      //
      "thirty-second_note": 1 / 32,
      demisemiquaver: 1 / 32,

      //
      "sixty-fourth_note": 1 / 64,
      hemidemisemiquaver: 1 / 64,

      //
      "hundred_twenty-eighth_note": 1 / 128,
      semihemidemisemiquaver: 1 / 128,

      //
      "two_hundred_fifty-sixth_note": 1 / 256,
      demisemihemidemisemiquaver: 1 / 256,
    };
  }

  private static parse_duration_syntactic_sugar(
    syntactic_sugar: string,
    context: {
      lines_per_pattern: number;
      lines_per_beat: number;
      relative_line: number;
      pattern: number;
    }
  ): { line: number; pattern: number } {
    syntactic_sugar = syntactic_sugar.toLowerCase();
    const note_value_constants = Duration.note_value_constants();
    const dotted_value_constants = Duration.dotted_value_constants();
    const tokens = syntactic_sugar.split(".");
    let number_of_beats = parseFloat(syntactic_sugar);
    if (isNaN(number_of_beats)) {
      switch (tokens.length) {
        case 1:
          // <number_of_beats> (duration)
          number_of_beats = std.Calculator.evaluate(
            tokens[0],
            note_value_constants
          );
          break;
        case 2:
          // <dotted_value>.<number_of_beats>
          std.Calculator.evaluate(tokens[1], note_value_constants);
          Array(dotted_value_constants[tokens[0]]).forEach(
            (_) =>
              (number_of_beats = number_of_beats + (number_of_beats * 1) / 2)
          );
          break;
        default:
          // @TODO: error
          Assert.error<string>();
          break;
      }
    }
    // we assume that all patterns have the same number of lines
    let absolute_line = Duration.get_absolute_line(
      context.lines_per_pattern,
      context.pattern,
      context.relative_line
    );
    absolute_line = Duration.get_absolute_line_plus_number_of_beats(
      context.lines_per_beat,
      absolute_line,
      number_of_beats
    );
    const pattern = Duration.get_number_of_patterns_per_absolute_line(
      context.lines_per_pattern,
      absolute_line
    );
    const relative_line = Duration.get_relative_line(
      context.lines_per_pattern,
      absolute_line
    );
    return {
      line: relative_line,
      pattern: pattern,
    };
  }

  public static evaluate(
    syntactic_sugar: string,

    context: {
      lines_per_pattern: number;
      lines_per_beat: number;
      relative_line: number;
      pattern: number;
    }
  ): { line: number; pattern: number } {
    return Duration.parse_duration_syntactic_sugar(syntactic_sugar, context);
  }
}
