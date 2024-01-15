//ref 什么值都可以响应式 可以传输任何数据类型

import { track, trigger } from "./effect"
import { toReactive } from "./utils"
const ref = <T>(value: T) => {
    return new RefImpl(value)
}
class RefImpl<T>{
    private __v_isRef = true //私有
    private _value: T
    constructor(value: T) {
        this._value = toReactive(value)
    }
    get value() {
        track(this, 'value')
        return toReactive(this._value)
    }
    set value(newVal: T) {
        if (newVal === this._value) return
        this._value = toReactive(newVal)
        trigger(this, "value", newVal)
    }
}

export default ref