# dawdsl

dawdsl is a domain specific language framework for digital audio workstations and other computer music technologies. 

For users, it offers a language for music composition that is intuitive to read, easy to write, expressive enough for most any type of music, and specific enough to be useful for musicians.

For developers, it offers an extensible platform on which to build domain specific languages in JSON, with modular compiler and interpreter units composed together in layers of transformation and compilation.

For everyone else, it offers nothing.

## Dependencies

To use dawdsl, you must have the following dependencies installed:

- lua 5.3
- make
- git
- bash

### Backends

Backends define how a dawdsl program is interpreted. You must have the dependencies for at least one backend installed. 

Note that at this time, the only available backend is `renoiselang`.

#### renoiselang

To use the renoiselang backend, you must have the following dependencies installed:

- Renoise 3.4.2

## Installation

To install dawdsl, do the following:

```
$ git clone github.com:iamlynnmckay/dawdsl
$ cd dawdsl
$ make
```

## Usage

### Application

#### Example

When `make` is run `src/dawdsl-renoise/TestPad.lua` is copied to the Renoise user scripts directory.

This lua script contains a complete end-to-end example of a dawdsl execution.
    
To run the script, open Renoise with 'renoise --scripting-dev', goto 'Tools > Scripting Terminal & Editor...', open 'User Scripts > TestPad.lua', and click 'Execute'.

### Library

dawdsl has a lua library that defines a single function `dawdsl` that takes one argument of type `<Message>`.

A <Message> is either a lua object with zero-indexed arrays, or a JSON encoded string, conforming to the following grammar.

```
    <Message> := <SeverMessage> | <ClientMessage>

    <ServerMessage> := '{
        "server": {
            "backend": (<Backend>|<null>),
            "port": (<number>|<null>),
            "modules": (<array<Module>>|<null>)
        }
    }'

    <Backend> := <string>
    <Module> := <string>

    <ClientMessage> := '{
        "client": {
            "backend": (<Backend>|<null>),
            "address": (<string>|<null>),
            "port": (<number>|<null>),
            "program": <Program>
        }
    }'

    <Program> := ...

```

The semantics of each type of message and its properties is given hence.

- `<ServerMessage>`
    - Used to start a dawdsl server with the given port, backend, and modules. By default, port = 49151, backend = "renoiselang" and modules = ["trackerlang.module.builtin"].
- `<Backend>`
    - The backend is used to define the interpreter. It must be the name a of lua package defining a function 'server', that takes a port number and an array of <Module> and returns a handle to the server, and a function 'client', that takes a server address and port number, and returns a function 'send', that itself takes a message and sends it to the server at the given port and address. The only natively supported backend at this time is 'renoiselang'. See https://github.com/iamlynnmckay/dawdsl/src/renoiselang for more information.
- `<Module>`
    - The modules are an array of strings used to define the compiler. They must be the names of lua packages that define valid trackerlang compiler modules. For more information on trackerlang, see github.com/iamlynnmckay/dawdsl/src/trackerlang. for more information.
- `<ClientMessage>`
    - Used to send a message to a running dawdsl server with the given address, port, and program to be evaluated. By default, address = "localhost" and port = 49151.
- `<Program>`
    - The program to be evaluated. The syntax and semantics of the program depends on the compiler used, which is defined by the modules, and the interpreter used, which is defined by the backend.
