import * as Common from "./Common"

type Key = Common.Key
type Callback<_Value> = Common.Callback<_Value>
type Property = Common.Property
type Index = Common.Index

export function shallowIterator<
Value
>(
    object: _Value1, 
    callback: Callback<_Value2>
): _Value2 {
    if (Array.isArray(object)) {
        return (object as Array<_Value1>).map((value: _Value1, key: Index) => {
            return callback(key, value, object);
        });
    } else if (Common.Type.Map<.object(object)) {
        return Object.entries(object).map(([key, value]: [Common.Key, _Value]) => {
            return callback(key, value, object);
        });
    } else {
        return callback(undefined, object, object);
    }
}
export function deepIterator(object: Any, callback: Any): Any {
    function recursiveDeepIterator(
        keys: Common.Key[],
        object: Any,
        callback: ,
        root: Any,
        size: number
    ) {
        keys = keys.slice(0, size);
        keys.push(-1);
        const result = shallowIterator(
            object,
            (key: Any, value: Any, _: Any) => {
                if (key === undefined) {
                    return value;
                } else {
                    keys[size] = key;
                    return recursiveDeepIterator(
                        keys,
                        value,
                        callback,
                        object,
                        size + 1
                    );
                }
            }
        );
        keys = keys.slice(0, size);
        return callback(keys, result, root);
    }
    recursiveDeepIterator([], object, callback, object, 0);
}