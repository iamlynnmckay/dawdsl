/*
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
      log: new Log(classList.concat(["log"])),
      status: new Status(classList.concat(["status"])),
      // @TODO: revisit type conversion here
      tree: new Tree(classList.concat(["tree"]), PROGRAM as unknown as _Tree),
    };
    [
       'status', 
      'json', 
      'lua',
      'log',
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
    Object.values(this.children).map((child) => child.build());

    Html.querySelectorAll(`#${this.getElement().id}`).map((element: HTMLElement) => {
      // on tree click
      element.addEventListener(`${this.getElement().id}-tree`, (e) => {
        e.target?.dispatchEvent(`${this.getElement().id}-status`, new CustomEvent({

        }))
      })
    })

    /*
    - @@@TODO: all of this can be done via functions in std/html, you don't even need the subcomponent classes, and the canvas drawing logic should be kept separate from the actual canvas element anyway, just add a new special creation scenario for canvas like you did for list
    on list click event
      update status with path
      update textarea with value from memory
    on text area event enter keypress event
      do update memory with value
      do update json with value
      do update log with calculation
      do update lua with compilation
      do update canvas with calculation

  }
}

    /*
export type _Tree = { [key: string]: string | _Tree | _Tree[] };
  public static appendChildModule(parent: HTMLElement, tag: string, id: string) {
    let element = document.createElement(tag);
    element.id = `${parent.id}-${id}`;
    Array.from(parent.classList).concat([id]).map(id => element.classList.add(id))
    parent.appendChild(element)
  }

 private static parseTree(tree: _Tree): string {
      function parseTreeRecursive(tree: _Tree): string {
        return Visitor.deepVisitor(tree, (k: Any, v: Any, t: Any) => {
          if (k.length === 0) return v;
          const id = k.join(".");
          const label = k[k.length - 1];
          if (TypeOf.String(v)) {
            return `<li id="${id}" class='string'><span>${label}</span></li>`;
          } else if (TypeOf.Array(v)) {
            return `<li id="${id}" class='array'><span>${label}</span>
                  
                  <ul>${(v as _Tree[])
                    .map((v) => parseTreeRecursive(v))
                    .join("")}</ul></li>`;
          } else {
            return `<li id="${id}" class='object'><span>${label}</span>
                  
                  <ul>${parseTreeRecursive(v as _Tree)}</ul></li>`;
          }
        });
      }
      return `<ul class="root">${parseTreeRecursive(tree)}</ul>`;
    }

  public static appendChildTreeModule(parent: HTMLElement, tag: string, id: string) {
    // @@@TODO: HERE!!!
  }
import { RenoiseJson } from "../../common/std/RenoiseJson";
import { Any } from "../std";
import { Canvas } from "./components/Canvas";
import { Component } from "./components/Component";
import { Editor } from "./components/TextArea";
import { Help } from "./Help";
import { Json } from "./Json";
import {Log} from "./components/InnerTextListener"
import { Lua } from "./Lua";
import { Status } from "./Status";
import { Tree, _Tree } from "./components/List";
import { std } from "../../../common";
import { Calculator, Functors, Html } from "../../std";
import { Component } from "./Component";

export class Canvas extends Component {
    private static readonly calculator: Calculator = new Calculator({
      pitch: std.Pitch.pitch,
      normalize: std.Math.normalize,
    } as Functors)

  private draw() {
    function fun1(x: number) {
      const expression = document.getElementsByTagName("textarea")![0].value;
      //return Calculator.evaluate(expression)
      return Canvas.calculator.eval(
        `${expression}`
      )(x);
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
    const canvas: HTMLCanvasElement =
      document.getElementsByTagName("canvas")[0];
    if (null == canvas || !canvas.getContext) return;

    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //ctx.imageSmoothingEnabled = false

    const axes = {
      x0: 0.1 * canvas.height, // x0 pixels from left to x=0
      y0: 0.5 * canvas.height, // y0 pixels from top to y=0
      scale: (0.5 * canvas.height) / 2, // 10 pixels from x=0 to x=1
      doNegativeX: false,
      w: canvas.width,
      h: canvas.height,
      xSamples: 64,
      ySamples: 8 - 1,
    };
    const c1 = std.Color.randomHexColorHighContrast();
    const c2 = std.Color.hashedHexColorHighContrast(c1);
    funGraph(ctx, axes, fun1, c2, 2);
    //funGraph(ctx, axes, fun2, `${c1}`, 2);
  }

  constructor(classList: string[]) {
    super(classList);
    this.getElement().innerHTML = `<canvas class="${classList.join(
      " "
    )}" width='1000px' height='500px'></canvas>`;
  }

  public build(memory: { [_: string]: string }): void {
    ((draw) => {
      Html.querySelectorAll("textarea").map((e) => {
        e.oninput = function () {
          let path = "";
          Html.querySelectorAll(".status pre").map((p) => {
            path = p.innerText;
            memory[path] = (e as HTMLTextAreaElement).value;
            console.log(memory);
          });
          draw();
        };
      });
    })(this.draw);
  }
}

  */

/*

export class Tree extends Component {


  constructor(classList: string[], tree: _Tree) {
    super(classList);
    this.getElement().innerHTML = Tree.parseTree(classList.join(" "), tree);
  }

  public build(memory: { [_: string]: string }): void {
    Html.querySelectorAll(`#${this.getElement().id}`).map((element) => {
      Html.querySelectorAll(`span`, element).map(
        (span) =>
          (span.onclick = () => {
            const li = (span as HTMLElement).parentElement!;
            let path = "";
            Html.querySelectorAll(".string", element).map((e) =>
              e.classList.remove("onclick")
            );
            if (li.classList.contains("onclick")) {
              path = (
                li.parentElement!.parentElement!.children[0] as HTMLElement
              ).dataset.id!;
              li.classList.remove("onclick");
            } else {
              // @TODO: emit event here instead
              path = span.dataset.id!;
              if (li.classList.contains("string")) {
                Html.querySelectorAll(`textarea`).map(
                  (e) => ((e as HTMLTextAreaElement).value = memory[path] || "")
                );
              }
              li.classList.add("onclick");
            }
            if (li.classList.contains("string")) {
              Html.querySelectorAll(`.path`).map((e) => (e.innerHTML = path));
            }
          })
      );
    });
  }
}

*/
