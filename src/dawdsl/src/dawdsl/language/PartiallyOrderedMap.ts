import * as Common from "./Common";
export type PartiallyOrderedMap<Value> = {
  [_: Common.Key]: {
    before: Common.Key[];
    after: Common.Key[];
    value: Value;
  };
};

// @TODO: as totally ordered list
