type RGB = [r: number, g: number, b: number];
type HSL = [h: number, s: number, l: number];
type HSV = [h: number, s: number, v: number];
type HEX = string;
export class Color {
  public static rgbToHsl([r, g, b]: RGB): HSL {
    (r /= 255), (g /= 255), (b /= 255);

    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = NaN,
      s;
    const l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return [h, s, l];
  }

  public static hslToRgb([h, s, l]: HSL): RGB {
    let r, g, b;

    function hue2rgb(p: number, q: number, t: number) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
  }

  public static rgbToHsv([r, g, b]: RGB): HSV {
    (r /= 255), (g /= 255), (b /= 255);

    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = NaN;
    const v = max;

    const d = max - min;
    const s = max == 0 ? 0 : d / max;

    if (max == min) {
      h = 0; // achromatic
    } else {
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }

      h /= 6;
    }

    return [h, s, v];
  }

  public static hsvToRgb([h, s, v]: HSV): RGB {
    let r = NaN,
      g = NaN,
      b = NaN;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0:
        (r = v), (g = t), (b = p);
        break;
      case 1:
        (r = q), (g = v), (b = p);
        break;
      case 2:
        (r = p), (g = v), (b = t);
        break;
      case 3:
        (r = p), (g = q), (b = v);
        break;
      case 4:
        (r = t), (g = p), (b = v);
        break;
      case 5:
        (r = v), (g = p), (b = q);
        break;
    }

    return [r * 255, g * 255, b * 255];
  }

  public static hslToHsv = (c: HSL) => Color.rgbToHsv(Color.hslToRgb(c));
  public static hsvToHsl = (c: HSL) => Color.rgbToHsl(Color.hsvToRgb(c));

  public static hexToRgb(s: string): RGB {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    s = s.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(s);
    return result
      ? [
          parseInt(result[1], 16) || NaN,
          parseInt(result[2], 16) || NaN,
          parseInt(result[3], 16) || NaN,
        ]
      : [NaN, NaN, NaN];
  }

  public static rgbToHex([r, g, b]: RGB): HEX {
    function componentToHex(c: number) {
      let s = c.toString(16);
      if (s.includes(".")) s = s.split(".")[0];
      return s.length == 1 ? "0" + s : s;
    }
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  public static hslToHex = (c: HSL) => Color.rgbToHex(Color.hslToRgb(c));
  public static hexToHsl = (c: HEX) => Color.rgbToHsl(Color.hexToRgb(c));
  public static hexToHsv = (c: HEX) => Color.rgbToHsv(Color.hexToRgb(c));
  public static hsvToHex = (c: HSV) => Color.rgbToHex(Color.hsvToRgb(c));

  public static randomHexColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  public static javaHashCode(s: string): number {
    // returns a 32 bit int
    let hash = 0;
    for (let i = 0, len = s.length; i < len; i++) {
      const chr = s.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

  public static hashedHexColor(s: string) {
    // strip last 4 bits from 32 bit hava hash code to get 24 bit hex code
    return "#" + (Color.javaHashCode(s) & 0xffffff).toString(16);
  }

  public static randomHexColorHighContrast() {
    const c = Color.randomHexColor();
    const [h, _1, _2] = Color.hexToHsv(c);
    return Color.hsvToHex([h, 1, 1]);
  }

  public static hashedHexColorHighContrast(s: string) {
    const c = Color.hashedHexColor(s);
    console.log(c);
    const [h, _1, _2] = Color.hexToHsv(c);
    return Color.hsvToHex([h, 1, 1]);
  }
}
