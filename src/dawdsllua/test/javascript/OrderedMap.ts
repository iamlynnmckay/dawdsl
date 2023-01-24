// import Assert from './std/assert.js'

type Self<Value> = { before: Key; after: Key; table: { [x: Key]: { before: Key | undefined, after: Key | undefined, value: Value } } }

function defined<T>(a: T | undefined): boolean {
    return typeof(a) !== 'undefined'
}

type Key = string

export class OrderedMap<Value> {

    static #insertBetween<Value>(self: Self<Value>, key: Key, value: Value, before: Key, after: undefined) : Self<Value>
    static #insertBetween<Value>(self: Self<Value>, key: Key, value: Value, before: undefined, after: Key) : Self<Value>
    static #insertBetween<Value>(self: Self<Value>, key: Key, value: Value, before: undefined, after: undefined) : Self<Value>

    static #insertBetween<Value>(
        self: Self<Value>,
        key: Key,
        value: Value,
        before: Key | undefined,
        after: Key | undefined
    ) : Self<Value> {
        if (defined(before) && defined(after)) {
            self.table[key] = {value: value, before: before, after: after}
        } else if (defined(before)) {
            self.table[key] = {value: value, before: before, after: self.table[before as Key].after}
        } else if (defined(after)) {
            self.table[key] = {value: value, before: self.table[after as Key].before, after: after}
        } else {
            self.table[key] = {value: value, before: undefined, after: undefined}
            self.before = key
            self.after = key
        }
        self.table[self.table[key].after as Key].before = key
        self.table[self.table[key].before as Key].after = key
        return self
    }
    
    static #insertBefore<Value>(self: Self<Value>, key: Key, value: Value, after: undefined) : Self<Value>
    static #insertBefore<Value>(self: Self<Value>, key: Key, value: Value, after: Key) : Self<Value>

    static #insertBefore<Value>(
        self: Self<Value>,
        key: Key,
        value: Value,
        after: Key | undefined
    ) : Self<Value> {
        return (defined(after))
            ? OrderedMap.#insertBetween(self, key, value, undefined, after as Key)
            : OrderedMap.#insertBetween(self, key, value, self.before, undefined)
    }
    
    static #insertAfter<Value>(self: Self<Value>, key: Key, value: Value, before: undefined) : Self<Value>
    static #insertAfter<Value>(self: Self<Value>, key: Key, value: Value, before: Key) : Self<Value>

    static #insertAfter<Value>(
        self:  Self<Value>,
        key: Key,
        value: Value,
        before: Key | undefined
    ) : Self<Value> {
        return (defined(before)) 
            ? OrderedMap.#insertBetween(self, key, value, before as Key, undefined)
            : OrderedMap.#insertBetween(self, key, value, undefined, self.after)
    }
    
    static #forwardIterator<Value>(self: Self<Value>, callback: (k:Key, v:Value) => void, key?: Key): void {
        const k = defined(key) ? key as Key : self.after
        const v = self.table[k]
        callback(k, v.value)
        defined(v.after)
            ? OrderedMap.#forwardIterator(self, callback, k)
            : null
    }

    static #backwardIterator<Value>(self: Self<Value>, callback : (k:Key, v:Value) => void, key?: Key): void {
        const k = defined(key) ? key as Key : self.before
        const v = self.table[k]
        callback(k, v.value)
        defined(v.before)
            ? OrderedMap.#forwardIterator(self, callback, k)
            : null
    }

    #self: Self<Value>

    constructor(key: Key, value: Value) {
        this.#self = {
            before: key,
            after: key,
            table: {}
        }
        this.#self.table[key] = { before: undefined, after: undefined, value: value}
    }

    insertBefore(
        key: Key,
        value: Value,
        after?: Key
    ) {
        defined(after) 
            ? this.#self = OrderedMap.#insertBefore(this.#self, key, value, after as Key)
            : this.#self = OrderedMap.#insertBefore(this.#self, key, value, after as undefined) 
        return this
    }
    insertAfter(
        key: Key,
        value: Value,
        before?: Key
    ) {
        defined(before) 
            ? this.#self = OrderedMap.#insertAfter(this.#self, key, value, before as Key)
            : this.#self = OrderedMap.#insertAfter(this.#self, key, value, before as undefined) 
        return this
    }
  
    forwardIterator(
        callback: (k:Key, v:Value) => void
    ) {
        OrderedMap.#forwardIterator(this.#self, callback)
        return this
    }
    backwardIterator(
        callback: (k:Key, v:Value) => void
    ) {
        OrderedMap.#backwardIterator(this.#self, callback)
        return this
    }
  
}
