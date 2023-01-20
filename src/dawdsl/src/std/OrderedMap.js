"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _OrderedMap_self, _OrderedMap_insertIfBeforeAndAfterAreNull, _OrderedMap_insertIfBeforeIsNullAndAfterIsNotNull, _OrderedMap_insertIfAfterIsNullAndBeforeIsNotNull, _OrderedMap_insertIfBeforeAndAfterAreNotNull, _OrderedMap_insertBetween, _OrderedMap_insertBefore, _OrderedMap_insertAfter, _OrderedMap_at, _OrderedMap_forwardIterator, _OrderedMap_backwardIterator;
Object.defineProperty(exports, "__esModule", { value: true });
const assert_js_1 = __importDefault(require("./std/assert.js"));
class OrderedMap {
    constructor() {
        _OrderedMap_self.set(this, {
            before: null,
            after: null,
            table: {}
        });
        __classPrivateFieldSet(this, _OrderedMap_self, {}, "f");
    }
    insertBefore(key, value, after) {
        return __classPrivateFieldGet(OrderedMap, _a, "m", _OrderedMap_insertBefore).call(OrderedMap, this.self, key, value, after);
    }
    insertAfter(key, value, before) {
        return __classPrivateFieldGet(OrderedMap, _a, "m", _OrderedMap_insertAfter).call(OrderedMap, this.self, key, value, before);
    }
    at(key) {
        return __classPrivateFieldGet(OrderedMap, _a, "m", _OrderedMap_at).call(OrderedMap, this.self, key);
    }
    forwardIterator(callback, key) {
        return __classPrivateFieldGet(OrderedMap, _a, "m", _OrderedMap_forwardIterator).call(OrderedMap, this.self, callback, key);
    }
    backwardIterator(callback, key) {
        return __classPrivateFieldGet(OrderedMap, _a, "m", _OrderedMap_backwardIterator).call(OrderedMap, this.self, callback, key);
    }
}
_a = OrderedMap, _OrderedMap_self = new WeakMap(), _OrderedMap_insertIfBeforeAndAfterAreNull = function _OrderedMap_insertIfBeforeAndAfterAreNull(self, key, value) {
    assert_js_1.default.notNull(self, key, value);
    assert_js_1.default.null(self.before, self.after);
    assert_js_1.default.notHasOwnProperty(self.table, key);
    self.table[key] = { value: value };
    self.before = key;
    self.after = key;
    return self;
}, _OrderedMap_insertIfBeforeIsNullAndAfterIsNotNull = function _OrderedMap_insertIfBeforeIsNullAndAfterIsNotNull(self, key, value, after) {
    assert_js_1.default.notNull(self, key, value, after, self.before, self.after);
    assert_js_1.default.notHasOwnProperty(self.table, key);
    self.table[key] = { value: value };
}, _OrderedMap_insertIfAfterIsNullAndBeforeIsNotNull = function _OrderedMap_insertIfAfterIsNullAndBeforeIsNotNull(self, key, value, before) {
    assert_js_1.default.notNull(self, key, value, before, self.before, self.after);
    assert_js_1.default.notHasOwnProperty(self.table, key);
    self.table[key] = { value: value };
}, _OrderedMap_insertIfBeforeAndAfterAreNotNull = function _OrderedMap_insertIfBeforeAndAfterAreNotNull(self, key, value, before, after) {
    assert_js_1.default.notNull(self, key, value, before, after, self.before, self.after);
    assert_js_1.default.notHasOwnProperty(self.table, key);
    self.table[key] = { value: value };
}, _OrderedMap_insertBetween = function _OrderedMap_insertBetween(self, key, value, before, after) {
    assert_js_1.default.notNull(self, key, value);
    assert_js_1.default.notHasOwnProperty(self.table, key);
    self.table[key] = { value: value };
}, _OrderedMap_insertBefore = function _OrderedMap_insertBefore(self, key, value, after) {
}, _OrderedMap_insertAfter = function _OrderedMap_insertAfter(self, key, value, before) {
}, _OrderedMap_at = function _OrderedMap_at(self, key) {
}, _OrderedMap_forwardIterator = function _OrderedMap_forwardIterator(self, callback, key) {
}, _OrderedMap_backwardIterator = function _OrderedMap_backwardIterator(self, callback, key) {
};
exports.OrderedMap = OrderedMap;
