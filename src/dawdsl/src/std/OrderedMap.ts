// import Assert from './std/assert.js'

import { normalize } from "path";
import { runInThisContext } from "vm";


type BeforeInsert = { before: undefined; after: undefined; table: undefined }
type Self = { before: string; after: string; table: { [x: string]: { before: string | undefined, after: string | undefined, value: any } } }

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

    static #insertBetween(self: Self, key: string, value: any, before: string, after: undefined) : Self
    static #insertBetween(self: Self, key: string, value: any, before: undefined, after: string) : Self
    static #insertBetween(self: Self, key: string, value: any, before: undefined, after: undefined) : Self

    static #insertBetween(
        self: Self,
        key: string,
        value: any,
        before: string | undefined,
        after: string | undefined
    ) : Self {
        const result : Self = {
            before: 'foo',
            after: 'bar',
            table: {x: {before: 'k', after: 'j', value: 1}}
        }
        return result
    }
    
    static #insertBefore(self: Self, key: string, value: any, after: undefined) : Self
    static #insertBefore(self: Self, key: string, value: any, after: string) : Self

    static #insertBefore(
        self: Self,
        key: string,
        value: any,
        after: string | undefined
    ) : Self {
        const result : Self = {
            before: 'foo',
            after: 'bar',
            table: {x: {before: 'k', after: 'j', value: 1}}
        }
        return result
    }
    
    static #insertAfter(self: Self, key: string, value: any, before: undefined) : Self
    static #insertAfter(self: Self, key: string, value: any, before: string) : Self

    static #insertAfter(
        self:  Self,
        key: string,
        value: any,
        before: string | undefined
    ) : Self {
        const result : Self = {
            before: 'foo',
            after: 'bar',
            table: {x: {before: 'k', after: 'j', value: 1}}
        }
        return result
    }
    
    /*

    static #forwardIterator(self: Self, callback): void {
        return 
    }

    static #backwardIterator(self; Self, callback): void {

    }
    */

    #self: Self

    static #defined<T>(a: T | undefined): boolean {
        return typeof(a) !== 'undefined'
    }

    constructor(key: string, value: any) {
        this.#self = {
            before: key,
            after: key,
            table: {}
        }
        this.#self.table[key] = { before: undefined, after: undefined, value: value}
    }

    insertBefore(
        key: string,
        value: any,
        after?: string
    ) {
        OrderedMap.#defined(after) 
            ? this.#self = OrderedMap.#insertBefore(this.#self, key, value, after as string)
            : this.#self = OrderedMap.#insertBefore(this.#self, key, value, after as undefined) 
        return this
    }
    insertAfter(
        key: string,
        value: any,
        before?: string
    ) {
        OrderedMap.#defined(before) 
            ? this.#self = OrderedMap.#insertBefore(this.#self, key, value, before as string)
            : this.#self = OrderedMap.#insertBefore(this.#self, key, value, before as undefined) 
        return this
    }
    /*
    forwardIterator(
        callback
    ) {
        OrderedMap.#forwardIterator(this.#self, callback)
        return this
    }
    backwardIterator(
        callback
    ) {
        return OrderedMap.#backwardIterator(this.#self, callback)
        return this
    }
    */
}
/*
class OrderedMap {
    static #insertIfBeforeAndAfterAreundefined(
        self: { before: any; after: any; table: { [x: string]: { value: any } } },
        key: string | number,
        value: any
    ) {
        Assert.notundefined(self, key, value)
        Assert.undefined(self.before, self.after)
        Assert.notHasOwnProperty(self.table, key)
        self.table[key] = { value: value }
        self.before = key
        self.after = key
        return self
    }
    static #insertIfBeforeIsundefinedAndAfterIsNotundefined(
        self: { before: any; after: any; table: { [x: string]: { value: any } } },
        key: string | number,
        value: any,
        after: any
    ) {
        Assert.notundefined(self, key, value, after, self.before, self.after)
        Assert.notHasOwnProperty(self.table, key)
        self.table[key] = { value: value }

    }
    static #insertIfAfterIsundefinedAndBeforeIsNotundefined(
        self: { before: any; after: any; table: { [x: string]: { value: any } } },
        key: string | number,
        value: any,
        before: any
    ) {
        Assert.notundefined(self, key, value, before, self.before, self.after)
        Assert.notHasOwnProperty(self.table, key)
        self.table[key] = { value: value }

    }
    static #insertIfBeforeAndAfterAreNotundefined(
        self: { before: any; after: any; table: { [x: string]: { value: any } } },
        key: string | number,
        value: any,
        before: any,
        after: any
    ) {
        Assert.notundefined(self, key, value, before, after, self.before, self.after)
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
        Assert.notundefined(self, key, value)
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