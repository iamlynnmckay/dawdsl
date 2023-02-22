(() => {



  class Dawdsl {
    private static NAME = "dawdsl";
    constructor() {
      const root = document.getElementById(Dawdsl.NAME)!;
      root.innerHTML = "";
      root.appendChild(Output.createOutput());
      root.appendChild(Tree.createTree(Dawdsl._SCHEMA));
      draw();
    }
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
})();
