import * as Common from "./Common";
export type PartiallyOrderedList<Value> = {
  before: Common.Key[];
  after: Common.Key[];
  key: Common.Key[];
  value: Value;
}[];

// @TODO: as partially ordered map
