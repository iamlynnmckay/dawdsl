import { RenoiseJson } from "../../../common/std/RenoiseJson";
import { Any } from "../../std";
import { Canvas } from "./Canvas";
import { Component } from "./Component";
import { Editor } from "./Editor";
import { Help } from "./Help";
import { Json } from "./Json";
import { Lua } from "./Lua";
import { Status } from "./Status";
import { Tree, _Tree } from "./Tree";

export const PROGRAM: RenoiseJson = {
  program: {
    transport: {
      lpb: "string",
    },
    instruments: [
      {
        name: "string",
        phrase_program: "string",
        filepath: "string",
        sample_filepath: "string",
      },

      {
        name: "string",
        phrase_program: "string",
        filepath: "string",
        sample_filepath: "string",
      },
    ],
    patterns: [
      {
        number_of_lines: "string",
        tracks: [
          {
            visible_note_columns: "string",
            visible_effect_columns: "string",
            volume_colum_visible: "string",
            panning_column_visible: "string",
            delay_column_visible: "string",
            sample_effects_column_visible: "string",
            note_columns: [
              {
                note_value: "string",
                note_string: "string",
                instrument_value: "string",
                instrument_string: "string",
                volume_value: "string",
                volumne_string: "string",
                panning_value: "string",
                panning_string: "string",
                delay_value: "string",
                delay_string: "string",
                effect_number_value: "string",
                effect_number_string: "string",
                effect_amount_value: "string",
                effect_amount_string: "string",
              },
              {
                note_value: "string",
                note_string: "string",
                instrument_value: "string",
                instrument_string: "string",
                volume_value: "string",
                volumne_string: "string",
                panning_value: "string",
                panning_string: "string",
                delay_value: "string",
                delay_string: "string",
                effect_number_value: "string",
                effect_number_string: "string",
                effect_amount_value: "string",
                effect_amount_string: "string",
              },
            ],
            effect_columns: [
              {
                number_value: "string",
                number_string: "string",
                amount_value: "string",
                amount_string: "string",
              },
              {
                number_value: "string",
                number_string: "string",
                amount_value: "string",
                amount_string: "string",
              },
            ],
          },
          {
            visible_note_columns: "string",
            visible_effect_columns: "string",
            volume_colum_visible: "string",
            panning_column_visible: "string",
            delay_column_visible: "string",
            sample_effects_column_visible: "string",
            note_columns: [
              {
                note_value: "string",
                note_string: "string",
                instrument_value: "string",
                instrument_string: "string",
                volume_value: "string",
                volumne_string: "string",
                panning_value: "string",
                panning_string: "string",
                delay_value: "string",
                delay_string: "string",
                effect_number_value: "string",
                effect_number_string: "string",
                effect_amount_value: "string",
                effect_amount_string: "string",
              },
              {
                note_value: "string",
                note_string: "string",
                instrument_value: "string",
                instrument_string: "string",
                volume_value: "string",
                volumne_string: "string",
                panning_value: "string",
                panning_string: "string",
                delay_value: "string",
                delay_string: "string",
                effect_number_value: "string",
                effect_number_string: "string",
                effect_amount_value: "string",
                effect_amount_string: "string",
              },
            ],
            effect_columns: [
              {
                number_value: "string",
                number_string: "string",
                amount_value: "string",
                amount_string: "string",
              },
              {
                number_value: "string",
                number_string: "string",
                amount_value: "string",
                amount_string: "string",
              },
            ],
          },
        ],
      },
      {
        number_of_lines: "string",
        tracks: [
          {
            visible_note_columns: "string",
            visible_effect_columns: "string",
            volume_colum_visible: "string",
            panning_column_visible: "string",
            delay_column_visible: "string",
            sample_effects_column_visible: "string",
            note_columns: [
              {
                note_value: "string",
                note_string: "string",
                instrument_value: "string",
                instrument_string: "string",
                volume_value: "string",
                volumne_string: "string",
                panning_value: "string",
                panning_string: "string",
                delay_value: "string",
                delay_string: "string",
                effect_number_value: "string",
                effect_number_string: "string",
                effect_amount_value: "string",
                effect_amount_string: "string",
              },
              {
                note_value: "string",
                note_string: "string",
                instrument_value: "string",
                instrument_string: "string",
                volume_value: "string",
                volumne_string: "string",
                panning_value: "string",
                panning_string: "string",
                delay_value: "string",
                delay_string: "string",
                effect_number_value: "string",
                effect_number_string: "string",
                effect_amount_value: "string",
                effect_amount_string: "string",
              },
            ],
            effect_columns: [
              {
                number_value: "string",
                number_string: "string",
                amount_value: "string",
                amount_string: "string",
              },
              {
                number_value: "string",
                number_string: "string",
                amount_value: "string",
                amount_string: "string",
              },
            ],
          },
          {
            visible_note_columns: "string",
            visible_effect_columns: "string",
            volume_colum_visible: "string",
            panning_column_visible: "string",
            delay_column_visible: "string",
            sample_effects_column_visible: "string",
            note_columns: [
              {
                note_value: "string",
                note_string: "string",
                instrument_value: "string",
                instrument_string: "string",
                volume_value: "string",
                volumne_string: "string",
                panning_value: "string",
                panning_string: "string",
                delay_value: "string",
                delay_string: "string",
                effect_number_value: "string",
                effect_number_string: "string",
                effect_amount_value: "string",
                effect_amount_string: "string",
              },
              {
                note_value: "string",
                note_string: "string",
                instrument_value: "string",
                instrument_string: "string",
                volume_value: "string",
                volumne_string: "string",
                panning_value: "string",
                panning_string: "string",
                delay_value: "string",
                delay_string: "string",
                effect_number_value: "string",
                effect_number_string: "string",
                effect_amount_value: "string",
                effect_amount_string: "string",
              },
            ],
            effect_columns: [
              {
                number_value: "string",
                number_string: "string",
                amount_value: "string",
                amount_string: "string",
              },
              {
                number_value: "string",
                number_string: "string",
                amount_value: "string",
                amount_string: "string",
              },
            ],
          },
        ],
      },
    ],
  },
};

export class Main {
  private children: { [_: string]: Component };
  private element: HTMLElement;
  constructor(classList: string[]) {
    this.element = document.createElement("div");
    this.element.id = classList.join("-");
    this.children = {
      canvas: new Canvas(classList.concat(["canvas"])),
      editor: new Editor(classList.concat(["editor"])),
      help: new Help(classList.concat(["help"])),
      json: new Json(classList.concat(["json"])),
      lua: new Lua(classList.concat(["lua"])),
      status: new Status(classList.concat(["status"])),
      // @TODO: revisit type conversion here
      tree: new Tree(classList.concat(["tree"]), PROGRAM as unknown as _Tree),
    };
    [
       'status', 
      'json', 
      'lua',
      'help', 
      'canvas',
       'tree',
      'editor', 
      ].map((child) =>
        this.element.appendChild(this.children[child].getElement())
      );
  }
  public getElement() {
    return this.element;
  }
  public build(memory: { [_: string]: string }): void {
    Object.values(this.children).map((child) => child.build(memory));
  }
}
