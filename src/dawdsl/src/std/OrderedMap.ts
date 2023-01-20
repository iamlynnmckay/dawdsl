// import Assert from './std/assert.js'

class OrderedMap {
    #self = { 
        before: null, 
        after: null, 
        table: {} 
    }
    constructor() {
        this.#self = {}
    }
    static #insertIfBeforeAndAfterAreNull(
        self: { before: any; after: any; table: { [x: string]: { value: any } } },
        key: string | number,
        value: any
    ) {
        Assert.notNull(self, key, value)
        Assert.null(self.before, self.after)
        Assert.notHasOwnProperty(self.table, key)
        self.table[key] = { value: value }
        self.before = key
        self.after = key
        return self
    }
    static #insertIfBeforeIsNullAndAfterIsNotNull(
        self: { before: any; after: any; table: { [x: string]: { value: any } } },
        key: string | number,
        value: any,
        after: any
    ) {
        Assert.notNull(self, key, value, after, self.before, self.after)
        Assert.notHasOwnProperty(self.table, key)
        self.table[key] = { value: value }

    }
    static #insertIfAfterIsNullAndBeforeIsNotNull(
        self: { before: any; after: any; table: { [x: string]: { value: any } } },
        key: string | number,
        value: any,
        before: any
    ) {
        Assert.notNull(self, key, value, before, self.before, self.after)
        Assert.notHasOwnProperty(self.table, key)
        self.table[key] = { value: value }

    }
    static #insertIfBeforeAndAfterAreNotNull(
        self: { before: any; after: any; table: { [x: string]: { value: any } } },
        key: string | number,
        value: any,
        before: any,
        after: any
    ) {
        Assert.notNull(self, key, value, before, after, self.before, self.after)
        Assert.notHasOwnProperty(self.table, key)
        self.table[key] = { value: value }

    }
    static #insertBetween(
        self: { table: { [x: string]: { value: any } } },
        key: string | number,
        value: any,
        before: any,
        after: any
    ) {
        Assert.notNull(self, key, value)
        Assert.notHasOwnProperty(self.table, key)
        self.table[key] = { value: value }

    }
    static #insertBefore(
        self: any,
        key: any,
        value: any,
        after: any
    ) {

    }
    static #insertAfter(
        self: any,
        key: any,
        value: any,
        before: any,
    ) {

    }
    static #at(
        self: any,
        key: any
    ) {

    }
    static #forwardIterator(
        self: any,
        callback: any,
        key: any
    ) {

    }
    static #backwardIterator(
        self: any,
        callback: any,
        key: any
    ) {

    }
    insertBefore(
        key: any,
        value: any,
        after: any
    ) {
        return OrderedMap.#insertBefore(this.self, key, value, after)
    }
    insertAfter(
        key: any,
        value: any,
        before: any
    ) {
        return OrderedMap.#insertAfter(this.self, key, value, before)
    }
    at(
        key: any
    ) {
        return OrderedMap.#at(this.self, key)
    }
    forwardIterator(
        callback: any,
        key: any
    ) {
        return OrderedMap.#forwardIterator(this.self, callback, key)
    }
    backwardIterator(
        callback: any,
        key: any
    ) {
        return OrderedMap.#backwardIterator(this.self, callback, key)
    }
}



//exports.OrderedMap = OrderedMap