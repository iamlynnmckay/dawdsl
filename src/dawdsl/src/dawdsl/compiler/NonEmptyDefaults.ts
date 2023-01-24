import { Any, Type } from "../common";

const NonEmptyDefaults = [
  {
    definition: {
      transport: (_1: Any, v: Any, _2: Any) => (Type.undefined(v) ? {} : v),
      instruments: (_1: Any, v: Any, _2: Any) => (Type.undefined(v) ? [] : v),
      tracks: (_1: Any, v: Any, _2: Any) => (Type.undefined(v) ? [] : v),
      patterns: (_1: Any, v: Any, _2: Any) => (Type.undefined(v) ? [] : v),
      events: (_1: Any, v: Any, _2: Any) => (Type.undefined(v) ? [] : v),
    },
  },
];

export { NonEmptyDefaults };
