import { Any, TypeOf, Visitor } from "../../std";

type Tree = { [key: string]: string | Tree | Tree[] };

type Program = {
  program: {
    transport: {
      lpb: string;
    };
    instruments: {
      name: string;
      phrase_program: string;
      filepath: string;
      sample_filepath: string;
    }[];
    patterns: {
      number_of_lines: string;
      tracks: {
        visible_note_columns: string;
        visible_effect_columns: string;
        volume_colum_visible: string;
        panning_column_visible: string;
        delay_column_visible: string;
        sample_effects_column_visible: string;
        note_columns: {
          note_value: string;
          note_string: string;
          instrument_value: string;
          instrument_string: string;
          volume_value: string;
          volumne_string: string;
          panning_value: string;
          panning_string: string;
          delay_value: string;
          delay_string: string;
          effect_number_value: string;
          effect_number_string: string;
          effect_amount_value: string;
          effect_amount_string: string;
        }[];
        effect_columns: {
          number_value: string;
          number_string: string;
          amount_value: string;
          amount_string: string;
        }[];
      }[];
    }[];
  };
};

export const PROGRAM: Program = {
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

function ul() {
  document.createElement("ul");
}

function li() {
  document.createElement("li");
}

function parseTree(tree: Tree): string {
  return Visitor.deepVisitor(tree, (k: Any, v: Any, t: Any) => {
    if (k.length === 0) return v;
    const id = k.join(".");
    const label = k[k.length - 1];
    if (TypeOf.String(v)) {
      return `<li class='string' ><span data-id="${id}">${label}</span></li>`;
    } else if (TypeOf.Array(v)) {
      return `<li class='array' ><span data-id="${id}">${label}</span><ul>${(
        v as Tree[]
      )
        .map(parseTree)
        .join("")}</ul></li>`;
    } else {
      return `<li  class='object'><span data-id="${id}">${label}</span><ul>${parseTree(
        v as Tree
      )}</ul></li>`;
    }
  });
}

export class HTMLHelper {
    public static querySelectorAll(query: string, element?: HTMLElement): HTMLElement[] {
        return Array.from((element || document).querySelectorAll(query)!).map(e => (e as HTMLElement))
    }
}


export function createTreeWidget( tree: Tree, classList: string[]) : DocumentFragment {
    let fragment = document.createDocumentFragment()
  const root = document.createElement('div')
  root.classList.add(...classList);
  const pathWidget = document.createElement('div')
  pathWidget.innerHTML = `<span class='path'>...</span>`
  const canvasWidget = document.createElement('div')
  canvasWidget.innerHTML = `<canvas width='1000px' height='500px'></canvas>`
  const textBoxWidget = document.createElement('div')
  textBoxWidget.innerHTML = `<textarea></textarea>`
  const colorSelectorWidget = document.createElement('div')
  colorSelectorWidget.innerHTML = `<input type="color"></input>`
  const treeWidget = document.createElement('div');
  treeWidget.innerHTML = `<ul class='root'>${parseTree(tree)}</ul>`;
  root.appendChild(pathWidget)
  root.appendChild(canvasWidget)
  root.appendChild(treeWidget)
  root.appendChild(textBoxWidget)
  // root.appendChild(colorSelectorWidget)
  fragment.appendChild(root);
  return fragment
}

export function processTreeWidget(memory: {[_:string]:string}, classList: string[]) {
  HTMLHelper.querySelectorAll(`.${classList.join('.')} ul.root span`)
  .map(span => span.onclick = () => {
    let li = (span as HTMLElement).parentElement!;
    let path = ''
    HTMLHelper.querySelectorAll('.string', li.parentElement!).map(e => e.classList.remove('onclick'))
    if (li.classList.contains('onclick')) {
        path = (li.parentElement!.parentElement!.children[0] as HTMLElement).dataset.id! 
        li.classList.remove('onclick')
    } else {
        path = span.dataset.id! 
    if (li.classList.contains('string')) {
        
        HTMLHelper.querySelectorAll(`textarea`).map(e => (e as HTMLTextAreaElement).value = (memory[path] || ''))
    }
        li.classList.add('onclick')
    }
    if (li.classList.contains('string')) {

    HTMLHelper.querySelectorAll(`.${classList.join('.')} .path`).map(e => e.innerHTML = path)
    }
  })
}
