export class HtmlCanvasElement {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  constructor(canvas: HTMLCanvasElement, width?: number, height?: number) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.width = width || canvas.width;
    canvas.height = height || canvas.height;
    //
  }
  public onCustomEvent(event: CustomEvent) {
    // @TODO
    return event;
  }
  public renderCircle(x: number, y: number, r: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI, true);
    this.ctx.fill();
    this.ctx.stroke();
  }
  public renderLine(x1: number, y1: number, x2: number, y2: number) {
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }
}

/*

  function draw() {
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
  */
