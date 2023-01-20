"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
class Assert {
    static equal(a, ...bs) {
        bs.map((b) => strict_1.default.equal(a, b));
    }
    static notEqual(a, b) {
        bs.map((b) => strict_1.default.notEqual(a, b));
    }
    static null(...as) {
        as.map((a) => strict_1.default.equal(a, null));
    }
    static notNull(...as) {
        as.map((a) => strict_1.default.notEqual(a, null));
    }
    static hasOwnProperty(a, ...bs) {
        bs.map((b) => strict_1.default.equal(a.hasOwnProperty(b), true));
    }
    static notHasOwnProperty(a, ...bs) {
        bs.map((b) => strict_1.default.equal(a.hasOwnProperty(b), false));
    }
}
exports.Assert = Assert;
