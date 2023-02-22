import { Specification } from "../../../common/framework";
import { Any, TypeOf, Client, Server } from "../../std";

const InitializeClientAndServer: Specification = [
  {
    key: "InitializeClientAndServer",
    before: [],
    after: [],
    value: {
      client: (_1: (string | number)[], v: Any, o: Any): Any => {
        if (TypeOf.Undefined(v)) return;
        return new Client(v.port, v.address);
      },
      server: (_1: Any, v: Any, o: Any): Any => {
        if (TypeOf.Undefined(v)) return;
        return new Server(v.port, v.address);
      },
    },
  },
];

export { InitializeClientAndServer };
