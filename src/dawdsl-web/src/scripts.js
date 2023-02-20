(() => {

    let name = 'dawdsl'

    /*
    */

    class Dawdsl {
        constructor() {
            Dawdsl._createElementsForSchema(Dawdsl._SCHEMA)
        }
        static _NAME = 'dawdsl'
        static _SCHEMA = [
            [ { 'patterns': 4 } ],
            [ { 'tracks': 4 } ],
            [ { 'note_columns': 4}, {'effect_columns': 4} ],
            [ 'note_string', 'volume_value' ]
        ]
        static _onclick(i, j) {

        }
        static _getRootElement() {
            return document.getElementById(Dawdsl._NAME)
        }
        static _createRowElement(i) {
            let root = Dawdsl._getRootElement()
            let element = document.createElement('div')
            element.classname = 'row'
            element.onclick = () => Dawdsl._onclick(i)
            root.appendChild(element)
        }
        static _createColumnElement(i, j, name, size) {
            let root = Dawdsl._getRootElement().children[i]
            let element = document.createElement('span')
            element.className = 'column'
            Array(size).map((_, k) => {
                let nested = document.createElement('span')
                nested.innerText = k
                nested.className = 'nested'
                element.appendChild(nested)
            })
            element.onclick = () => Dawdsl._onclick(i, j)
            root.appendChild(element)
        }
        static _createTextElement(i, j, name) {
            let root = Dawdsl._getRootElement().children[i]
            let element = document.createElement('input')
            element.className = 'column'
            element.onclick = () => Dawdsl._onclick(i, j)
            root.appendChild(element)
        }
        static _createElementsForSchema(schema) {
            schema.map((x, i) => {
                Dawdsl._createRowElement(i)
                if (i == schema.length - 1) {
                    x.map((y, j) => {
                        Dawdsl._createTextElement(i, j, y)
                    })
                } else {
                    x.map((y, j) => Object.entries(y).map(([k, v]) => {
                        Dawdsl._createColumnElement(i, j, k, v)
                    }))
                }
            })

        }
    }

    let self = new Dawdsl()

})()