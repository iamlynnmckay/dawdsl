import { Type, Any, File, Client, Server } from "../common";

const InitializeClientAndServer = [
  {
    name: "InitializeClientAndServer",
    definition: {
      client: (_1: Any, v: Any, o: Any): Any => {
        if (Type.undefined(v)) return;
        return new Client(v.port, v.address);
      },
      server: (_1: Any, v: Any, o: Any): Any => {
        if (Type.undefined(v)) return;
        return new Server(v.port, v.address);
      },
    },
  },
];

export { InitializeClientAndServer };
