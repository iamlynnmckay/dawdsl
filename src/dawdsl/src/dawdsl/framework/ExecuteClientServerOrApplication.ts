import { Type, Any, File, Client, Server } from "../common"

const ExecuteClientServerOrApplication = [
    {
        name: 'ExecuteClientServerOrApplication',
        definition: {
            client: (_: Any, v: Any, o: Any): Any => { o.client.write(JSON.stringify(o.compiler.visit(o.program))) },
            server: (_: Any, v: Any, o: Any): Any => { o.server.listen((message: string) => { o.interpreter.visit(JSON.parse(message)) }) },
            application: (_: Any, v: Any, o: Any) => { o.interpreter.visit(o.compiler.visit(o.program)) },
        }
    },
]

export { ExecuteClientServerOrApplication }