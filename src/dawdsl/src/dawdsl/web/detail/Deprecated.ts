import { Calculator } from "../../common/dsl/renoise/detail/Calculator"
import { Color } from "../std";
import * as TreeWidget from "./widgets/Tree";
export function deprecated() {
  const name = "dawdsl";

  /*
   */

  function fun1(x: number) {
    let expression = document.getElementsByTagName("textarea")![0].value
    expression = expression.replace(/x/, x.toString())
    //return Calculator.evaluate(expression)
    return eval(expression)
  }
  function fun2(x: number) {
    return Math.sin(Math.random() - 0.5);
  }
  function fun3(x: number) {
    return Math.sin(x * 100);
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
      x0: /*0.5 + 0.5* * canvas.width*/ 0.1 * canvas.height, // x0 pixels from left to x=0
      y0: 0.5 * canvas.height, // y0 pixels from top to y=0
      scale: (0.5 * canvas.height) / 2, // 10 pixels from x=0 to x=1
      doNegativeX: false,
      w: canvas.width,
      h: canvas.height,
      xSamples: 64,
      ySamples: 8 - 1,
    };
    const c1 = Color.randomHexColorHighContrast();
    const c2 = Color.hashedHexColorHighContrast(c1);
    showAxes(ctx, axes);
    funGraph(ctx, axes, fun1, c2, 2);
    //funGraph(ctx, axes, fun2, `${c1}`, 2);
  }

  function funGraph(
    ctx: CanvasRenderingContext2D,
    axes: {
      x0: number;
      y0: number;
      scale: number;
      doNegativeX: boolean;
      ySamples: number;
      w: number;
      h: number;
      xSamples: number;
    },
    func: (_: number) => number,
    color: string,
    thick: number
  ) {
    let xx, yy;
    const dx = 4,
      x0 = axes.x0,
      y0 = axes.y0,
      w = axes.w,
      h = axes.h,
      scale = axes.scale;
    // @TODO
    const iMax = Math.round((w - x0) / dx);
    const iMin = axes.doNegativeX ? Math.round(-x0 / dx) : 0;
    ctx.beginPath();
    ctx.lineWidth = 1; // thick;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    const xSamples = axes.xSamples;
    const step = (iMax - iMin) / xSamples;
    for (let i = iMin; i <= iMax; i += step) {
      xx = dx * i;
      yy = scale * func(xx / scale);
      const xn = x0 + xx;
      if (xn >= w - x0) break;
      const yn = y0 - yy;

      const yr = yn;
      //if (i == iMin) ctx.moveTo(xn, yr);
      //else ctx.lineTo(xn, yr);
      //ctx.stroke();
      const hh = Math.round((h - y0) / axes.ySamples) / 4;
      //ctx.fillRect(xn - (hh/2),yn - (hh/2),hh,hh);
      ctx.beginPath();
      ctx.arc(xn, yn, hh / 2, 0, 2 * Math.PI, true);
      ctx.fill();
      ctx.stroke();
    }
    ctx.stroke();
  }

  function showAxes(
    ctx: CanvasRenderingContext2D,
    axes: {
      x0: number;
      y0: number;
      scale: number;
      doNegativeX: boolean;
      ySamples: number;
      w: number;
      h: number;
      xSamples: number;
    }
  ) {

  }


  class Dawdsl {
    private memory: {[_:string]:string}
    constructor() {
      this.memory = {}
      let self = this
      let fragment = TreeWidget.createTreeWidget(TreeWidget.PROGRAM, ["dawdsl", "tree"]);
      const root = document.getElementById("dawdsl")!;
      root.innerHTML = "";
      root.appendChild(fragment)
      TreeWidget.processTreeWidget(this.memory, ["dawdsl", "tree"])
      TreeWidget.HTMLHelper.querySelectorAll('textarea').map(e => {
        e.oninput = function() {
          let path = ''
          TreeWidget.HTMLHelper.querySelectorAll('.path').map(p => {
            path = p.innerText
            self.memory[path] = (e as HTMLTextAreaElement).value
            console.log(self.memory)
          })
      draw();
        }
      })

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
