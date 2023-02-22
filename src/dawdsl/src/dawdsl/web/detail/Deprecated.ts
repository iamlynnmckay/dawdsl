import { Color } from "../std";
export function deprecated() {
  const name = "dawdsl";

  type Schema = {
    key: string;
    value: {
      [_: string]: {
        // @TODO: maybe only have labels? idk, value and schema must be separate,
        default: string | number;
        size: number;
        labels: string[];
      };
    };
    children: Schema[];
  };

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
          };
        }[];
      }[];
    };
  };
  /*
   */

  function fun1(x: number) {
    return eval(document.getElementsByTagName("textarea")![0].value);
  }
  function fun2(x: number) {
    return Math.sin(Math.random());
  }

  // @TODO: remove after testing
  function draw() {
    const canvas: HTMLCanvasElement =
      document.getElementsByTagName("canvas")[0];
    if (null == canvas || !canvas.getContext) return;

    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //ctx.imageSmoothingEnabled = false

    const axes = {
      x0: 0.5 + 0.5 * canvas.width, // x0 pixels from left to x=0
      y0: 0.5 + 0.5 * canvas.height, // y0 pixels from top to y=0
      scale: 50, // 10 pixels from x=0 to x=1
      doNegativeX: true,
    };
    const c1 = Color.randomHexColorHighContrast();
    const c2 = Color.hashedHexColorHighContrast(c1);
    showAxes(ctx, axes);
    funGraph(ctx, axes, fun1, "magenta", 2);
    funGraph(ctx, axes, fun2, `${c1}`, 2);
    funGraph(ctx, axes, fun2, `${c2}`, 2);
  }

  function funGraph(
    ctx: CanvasRenderingContext2D,
    axes: { x0: number; y0: number; scale: number; doNegativeX: boolean },
    func: (_: number) => number,
    color: string,
    thick: number
  ) {
    let xx, yy;
    const dx = 4,
      x0 = axes.x0,
      y0 = axes.y0,
      scale = axes.scale;
    const iMax = Math.round((ctx.canvas.width - x0) / dx);
    const iMin = axes.doNegativeX ? Math.round(-x0 / dx) : 0;
    ctx.beginPath();
    ctx.lineWidth = thick;
    ctx.strokeStyle = color;

    for (let i = iMin; i <= iMax; i++) {
      xx = dx * i;
      yy = scale * func(xx / scale);
      if (i == iMin) ctx.moveTo(x0 + xx, y0 - yy);
      else ctx.lineTo(x0 + xx, y0 - yy);
    }
    ctx.stroke();
  }

  function showAxes(
    ctx: CanvasRenderingContext2D,
    axes: { x0: number; y0: number; scale: number; doNegativeX: boolean }
  ) {
    const x0 = axes.x0,
      w = ctx.canvas.width;
    const y0 = axes.y0,
      h = ctx.canvas.height;
    const xmin = axes.doNegativeX ? 0 : x0;
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.moveTo(xmin, y0);
    ctx.lineTo(w, y0); // X axis
    ctx.moveTo(x0, 0);
    ctx.lineTo(x0, h); // Y axis
    ctx.stroke();
  }

  class Output {
    static oninput(self: HTMLElement) {
      window.alert("fundion");
    }
    static createOutput(): DocumentFragment {
      const fragment = document.createDocumentFragment();
      {
        const element = document.createElement("div");
        element.innerHTML = `
          <div>
            <canvas width='1000px'></canvas>
            </div>
            <div>
            <pre>{}</pre>
            </div>
            <div>
            <input type="color"></input>
            <div>
            <textarea></textarea>
            </div>
            <!--
            <form>

            <input type="radio" value="foo" name="foo" id="foo">
            </input>
            <input type="radio" value="bar" name="foo" id="bar"></input>
            </form>

            <label for="cars">Choose a car:</label>
            <select  name="cars" id="cars">
              <optgroup label="Swedish Cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
              </optgroup>
              <optgroup label="German Cars">
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
              </optgroup>
            </select> 
            -->
        `;
        const e = element.querySelector("textarea")!;
        e.oninput = () => {
          Tree.current[Tree.property!] = e.value;
          document.querySelector("pre")!.innerHTML = JSON.stringify(
            Tree.current
          );
          draw();
        };
        fragment.appendChild(element);
      }
      return fragment;
    }
  }
  class Tree {
    static current: { [_: string]: string } = {};
    static property: string | null = null;
    static onclick(classes: string[]) {
      const new_current: { [_: string]: string } = {};
      classes.map((c, i) => {
        if (i < classes.length - 2) {
          new_current[c] = Tree.current[c];
        }
      });
      if (isNaN(parseInt(classes[classes.length - 1]))) {
        new_current[classes[classes.length - 1]] = "";
        Tree.property = classes[classes.length - 1];
      } else {
        Tree.property = null;
        new_current[classes[classes.length - 2]] = classes[classes.length - 1];
      }
      Tree.current = new_current;
      document.querySelectorAll(`.${classes[0]}`).forEach((x) => {
        if (
          x.classList.length == classes.length &&
          classes
            .map((c, i) => x.classList[i] === c)
            .reduce((x, c) => c && x, true)
        ) {
          x.setAttribute("style", "border:1px solid magenta");
        } else if (x.classList.length >= classes.length) {
          x.setAttribute("style", "border:1px solid white");
        }
        document.querySelector("pre")!.innerHTML = JSON.stringify(Tree.current);
      });
    }
    static _NAME = "dawdsl";
    static createTree(
      children: { [_: string]: number | string[] }[][]
    ): DocumentFragment {
      const fragment = document.createDocumentFragment();
      const element = document.createElement("div");
      fragment.appendChild(element);
      const classLists: string[][] = [];
      children.map((children, i) => {
        const element = document.createElement("div");
        fragment.children[0].appendChild(element);
        children.map((children, j) => {
          const element = document.createElement("div");
          fragment.children[0].children[i].appendChild(element);
          Object.entries(children).map(
            ([n, v]: [string, number | string[]]) => {
              if (classLists.length - 1 < j) {
                classLists.push(
                  classLists.length === 0
                    ? []
                    : classLists[classLists.length - 1].slice(0, -1)
                );
              }
              classLists[j].push(n);
              {
                const element = document.createElement("div");
                element.innerHTML = n;
                fragment.children[0].children[i].children[j].appendChild(
                  element
                );
              }
              {
                const element = document.createElement("div");
                fragment.children[0].children[i].children[j].appendChild(
                  element
                );
              }
              const fn = (k: string) => {
                const element = document.createElement("span");
                const classes = classLists[j].concat([k.toString()]);
                element.onclick = () => Tree.onclick(classes);
                classes.map((c) => element.classList.add(c));
                element.innerText = k.toString();
                fragment.children[0].children[i].children[
                  j
                ].children[1].appendChild(element);
              };
              if (typeof v === "number") {
                Array(v)
                  .fill(null)
                  .map((_, k) => fn(k.toString()));
              } else {
                v.map((k, _) => fn(k));
              }
            }
          );
        });
      });
      return fragment;
    }
  }

  class Dawdsl {
    constructor() {
      const root = document.getElementById("dawdsl")!;
      root.innerHTML = "";
      root.appendChild(Output.createOutput());
      root.appendChild(Tree.createTree(Dawdsl._SCHEMA));
      draw();
    }
    static _NAME = "dawdsl";
    static _SCHEMA: { [_: string]: number | string[] }[][] = [
      [{ pattern: 4 }],
      [{ track: 4 }],
      [{ note_column: 4 }, { effect_column: 4 }],
      [
        { note_column_property: ["note_string", "volume_value"] },
        { effect_column_property: ["foo"] },
      ],
    ];
  }

  const self = new Dawdsl();
}
