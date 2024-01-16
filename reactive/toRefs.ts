// 吧每个refs转换成ref
import toRef from "./toRef"
interface Res<T> {
    _v_isRef: boolean
    value: T[Extract<keyof T, string>]
}
const toRefs = <T extends object>(target: T) => {

    const map: Record<keyof any, Res<T>> = {}
    for (let key in target) {
        map[key as string] = toRef(target, key)
    }
    return map
}

export default toRefs

