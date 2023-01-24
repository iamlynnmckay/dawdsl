import {Type, Any, File} from "../common"
import * as path from "path"

const FindAndParseTestFiles = [
    {
        name: 'FindAndParseTestFiles',
        definition: {
            test: {
                expected: (_: Any, v: Any, o: Any) => {
                    if (Type.undefined(v)) {
                        v = path.parse(o.program).name + ".expected.json"
                    }
                    return JSON.parse(File.readSync(v))
                },
                actual: (_: Any, v: Any, o: Any) => {
                    if (Type.undefined(v)) {
                        v = path.parse(o.program).name + ".actual.json"
                    }
                }
            }
        }
    },
]

export {FindAndParseTestFiles}