import { Any, Is } from "../common";
import { DirectedAcyclicGraph } from "../common/Graph";
import { Specification } from "../common/Type";
import { DirectedAcyclicGraph } from "../common/Graph";
import { Specification } from "../common/Type";
const ExecuteClientServerOrApplication: DirectedAcyclicGraph<Specification.Value> =
  [
    {
      key: "ExecuteClientServerOrApplication",
      before: [
        "InitializeClientAndServer",
        "InitializeCompilerAndInterpreter",
        "InitializeProgram",
      ],
      after: [],
      value: {
        client: (_: Any, v: Any, o: Any): Any => {
          if (Is.Undefined(v)) return;
          o.client.write(JSON.stringify(o.compiler(o.program)));
        },
        server: (_: Any, v: Any, o: Any): Any => {
          if (Is.Undefined(v)) return;
          o.server.listen((message: string) => {
            o.interpreter(JSON.parse(message));
          });
        },
        application: (_: Any, v: Any, o: Any) => {
          if (Is.Undefined(v)) return;
          o.interpreter(o.compiler(o.program));
        },
      },
    },
  ];

export { ExecuteClientServerOrApplication };
