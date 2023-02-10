import { Any, Is, Client, Server } from "../common";
import { DirectedAcyclicGraph } from "../common/Graph";
import {
  String,
  Integer,
  Program,
  Specification,
  Property,
} from "../common/Type";
const InitializeClientAndServer: DirectedAcyclicGraph<Specification.Value> = [
  {
    key: "InitializeClientAndServer",
    before: [],
    after: [],
    value: {
      client: (
        _1: Property[],
        v: { port: Integer; address: string },
        o: Program.Value
      ): Any => {
        return new Client(v.port, v.address);
      },
      server: (_1: Any, v: Any, o: Any): Any => {
        if (Is.Undefined(v)) return;
        return new Server(v.port, v.address);
      },
    },
  },
];

export { InitializeClientAndServer };
