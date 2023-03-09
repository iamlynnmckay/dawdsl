import { Any } from "../Any"

  export const and = <A>(...fs: ((a: A) => Any)[]): ((a:A) => boolean)  => (x:Any) => fs.find(f => !f(x)) ? true : false
  export const or = <A>(...fs: ((a: A) => Any)[]): ((a:A) => boolean)  => (x:Any) => fs.find(f => f(x)) ? true : false
  export const as_function = (f: Any ): ((...as: Any[]) => Any) => (typeof f === 'function') ? f : () => f
  export const not = (f: Any): boolean => (as_function(f)()) ? true : false
  export const self = <T>(x: T): () => T => () => x
  export const defined = !undefined
  
  export const if_then = 
  (f1: Any, f2?: Any) => 
      (f2 === undefined)
      ?  (x: Any, y?: Any) => (f1(x) ? y : undefined)
      :  (x: Any, y?: Any) => (f1(x) ? f2(y) : undefined)