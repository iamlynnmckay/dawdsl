import * as net from "net"

export class Server {

    static #createServer() {
        return net.createServer()
    }
    static #listen(server: net.Server, port: number, address: string | undefined, sockets: Set<net.Socket>, callback: (message: string) => string) {
        server.listen(port, address || "localhost", () => console.log(`net.Server:listen(${port}, ${address})`))
        server.on('connection', (socket) => {
            console.log(`net.Server:connnection = ${socket}})`)
            socket.on('data', (data: string) => {
                console.log(`net.Socket:on['data'] = ${data}`)
                const response = callback(data)
                socket.write(response)
            })
            socket.on('close', () => {
                console.log(`net.Socket:on['close']`)
                sockets.delete(socket)
            })
            socket.on('error', (error: string) => console.error(`net.Socket:on['error'] = ${error}`))
            sockets.add(socket)
        })
    }

    #sockets: Set<net.Socket>
    #server: net.Server
    #port: number
    #address?: string
    constructor(port: number, address?: string) {
        this.#sockets = new Set()
        this.#server = Server.#createServer()
        this.#port = port
        this.#address = address
    }
    listen(callback: (message: string) => string) {
        Server.#listen(this.#server, this.#port, this.#address, this.#sockets, callback)
    }
}