import {Type, Any, File, Client, Server} from "../common"

const InitializeClientAndServer = [
    {
        name: 'InitializeClientAndServer',
        definition: {
            client: (_1: Any, v: Any, _2: Any): Any => new Client(v.port, v.address),
            server: (_1: Any, v: Any, _2: Any): Any => new Server(v.port, v.address)
        }
    },
]

export {InitializeClientAndServer}