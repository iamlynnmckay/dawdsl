import { DirectedAcyclicGraph } from "../std";
export type Callback = (_1: string[], _2: Value, _3: Value) => Value;
export type Module = { [_: string]: Module } | Callback;
export type Specification = DirectedAcyclicGraph<Module>;
export type Value =
  | boolean
  | number
  | string
  | null
  | Value[]
  | { [_: string]: Value }
  // @@@TODO: get rid of any type here
  | any;
