import { effect } from "./effect"
// 计算属性   值变化所依赖的页面也跟着变化 通过effect来进行页面更新
// 缓存 值不变就走缓存 否则重新获取值
export const computed = <T>(fn: () => T) => {

    let dirty = true //true获取新的值
    let _cacheValue: T
    const _value = effect(fn, { 
        lazy: true,
        scheduler:()=>{
            dirty=true
        }
    })
    class ComputedRefImp {
        get value() {
            if (dirty) {
                _cacheValue=_value()
                dirty=false
            } 
            return _cacheValue

        }

    }
    return new ComputedRefImp()
}    