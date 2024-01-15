// 数据响应
import { track, trigger } from "./effect"

const createReactive = <T extends Object>(target: T, shallow: boolean = false) => {
    // 修改数组的length 不能劫持
    return new Proxy(target, {
        // 读取
        get(target, key, receiver) {
            if (key == "raw") {
                return target
            }
            const res = Reflect.get(target, key)
            if (shallow) {
                return res
            }
            track(target, key)
            // 深层响应添加递归 
            if (typeof res === "object" && res !== null) {
                return createReactive(res)
            } else {
                return res
            }

        },
        // 写入
        set(target, key, value, receiver) {
            const res = Reflect.set(target, key, value)

            trigger(target, key, value)
            return res
        },
        // 函数调用
        apply() {

        },
    })
}
export default createReactive