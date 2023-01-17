(() => {

    let name = 'dawdsl'

    function response(event) {
        document.getElementById(`${name}-output`).innerHTML = JSON.stringify(event, 2)
    }

    function request() {
        socket.send(document.getElementById(`${name}-input`).innerHTML)
    }

    function connect() {
        let port = 49151
        let socket = new WebSocket(`wss://localhost:${port}`)

        socket.onopen = response
        socket.onmessage = response
        socket.onclose = response
        socket.onerror = response

        return socket
    }


    function embed() {
        document.getElementById(`${name}`).innerHTML = `
            <div>
                <textarea id="${name}-input" rows="10" cols="80"></textarea>
                <br/>
                <button onclick="request()">Submit</button>
                <br/>
                <textarea id="${name}-output" rows="10" cols="80"></textarea>
            </div>
        `
        return connect()
    }

    embed()

})()