// import Assert from './std/assert.js'

import { ReadableStreamDefaultReadValueResult } from "stream/web";

// type BeforeInsert = 
// type AfterInsert = { before: string; after: string; table: { [x: string]: { before: string, after: string, value: any } } }

/*
function foo(x: [string, number]) {
  console.log(1)  
} 
function bar(x: any) {
  console.log(2)  
}
type FooOrBar<A> =
    A extends [string, number] ?
    "foo" : 
    bar;
*/

export class OrderedMap {
/*
    #self: BeforeInsert = {
            before: null, 
            after: null, 
            table: {} 
        }
    constructor() {
    }
    static #insertBetween(self: BeforeInsert, key: string, value: any, before: undefined, after: undefined) : AfterInsert
    static #insertBetween(self: AfterInsert, key: string, value: any, before: string, after: undefined) : AfterInsert
    static #insertBetween(self: AfterInsert, key: string, value: any, before: undefined, after: string) : AfterInsert
    static #insertBetween(self: AfterInsert, key: string, value: any, before: undefined, after: undefined) : AfterInsert

    static #insertBetween(
        self: BeforeInsert | AfterInsert,
        key: string,
        value: any,
        before: string | undefined,
        after: string | undefined
    ) : AfterInsert {
        return self
    }

    static #insertBefore(self: BeforeInsert, key: string, value: any, after: undefined) : AfterInsert
    static #insertBefore(self: AfterInsert, key: string, value: any, after?: string) : AfterInsert
    static #insertAfter(self: BeforeInsert, key: string, value: any, before: undefined) : AfterInsert
    static #insertAfter(self: AfterInsert, key: string, value: any, before?: string) : AfterInsert
    static #forwardIterator(callback): null
    static #backwardIterator(callback): null

    insertBefore(
        key: string,
        value: any,
        after?: string
    ) {
        return OrderedMap.#insertBefore(this.#self, key, value, after)
    }
    insertAfter(
        key: string,
        value: any,
        before?: string
    ) {
        return OrderedMap.#insertAfter(this.#self, key, value, before)
    }
    forwardIterator(
        callback
    ) {
        return OrderedMap.#forwardIterator(this.#self, callback)
    }
    backwardIterator(
        callback
    ) {
        return OrderedMap.#backwardIterator(this.#self, callback)
    }
    */
}
/*
class OrderedMap {
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

}



//exports.OrderedMap = OrderedMap
*/