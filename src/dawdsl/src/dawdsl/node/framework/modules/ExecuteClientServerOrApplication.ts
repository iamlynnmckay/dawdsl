import { Specification } from "../../../common/framework";
import { Any, TypeOf } from "../../std";

const ExecuteClientServerOrApplication: Specification = [
  {
    key: "ExecuteClientServerOrApplication",
    before: ["InitializeClientAndServer", "LibraryModule", "InitializeProgram"],
    after: [],
    value: {
      client: (_: Any, v: Any, o: Any): Any => {
        if (TypeOf.Undefined(v)) return;
        o.client.write(
          JSON.stringify({
            program: o.compiler({ program: o.program }).program,
          })
        );
      },
      server: (_: Any, v: Any, o: Any): Any => {
        if (TypeOf.Undefined(v)) return;
        o.server.listen((message: string) => {
          o.interpreter(JSON.parse(message));
        });
      },
      application: (_: Any, v: Any, o: Any): Any => {
        if (TypeOf.Undefined(v)) return;
        console.log(
          JSON.stringify({
            program: o.interpreter({
              program: o.compiler({ program: o.program }).program,
            }).program,
          })
        );
      },
    },
  },
];

export { ExecuteClientServerOrApplication };
