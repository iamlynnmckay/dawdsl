import { Any, Type } from "../common";

const ExecuteClientServerOrApplication = [
  {
    name: "ExecuteClientServerOrApplication",
    dependsOn: [
      "InitializeClientAndServer",
      "InitializeCompilerAndInterpreter",
      "InitializeProgram",
    ],
    definition: {
      client: (_: Any, v: Any, o: Any): Any => {
        if (Type.undefined(v)) return;
        o.client.write(JSON.stringify(o.compiler.visit(o.program)));
      },
      server: (_: Any, v: Any, o: Any): Any => {
        if (Type.undefined(v)) return;
        o.server.listen((message: string) => {
          o.interpreter.visit(JSON.parse(message));
        });
      },
      application: (_: Any, v: Any, o: Any) => {
        if (Type.undefined(v)) return;
        o.interpreter.visit(o.compiler.visit(o.program));
      },
    },
  },
];

export { ExecuteClientServerOrApplication };
