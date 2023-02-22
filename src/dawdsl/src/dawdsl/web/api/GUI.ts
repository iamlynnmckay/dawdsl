import { Library } from "../../common/api";
import { deprecated } from "../detail/Deprecated";

export function GUI() {
  deprecated();
  return Library("renoise")({ program: {} });
}
