import * as net from "net"

export class Client {
    static #connect(port: number, address?: string) {
        const client = new net.Socket()
        client.connect(port, address || "localhost", () => console.log(`net.Socket:connect(${port}, ${address})`))
        client.on('data', (data: string) => console.log(`net.Socket:on['data'] = ${data}`))
        client.on('error', (error: string) => console.error(`net.Socket:on['error'] = ${error}`))
        return client
    }
    static #write(client: net.Socket, message: string) {
        client.write(message)
    }
    #client
    constructor(port: number, address?: string) {
        this.#client = Client.#connect(port, address)
    }
    write(message: string) {
        Client.#write(this.#client, message)
    }


}