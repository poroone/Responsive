// reactive 包裹object array set map 处理复杂数据类型的
// 不能处理普通的类型
// 使用proxy 进行数据劫持
// Object.defineProperty
// 区别
// object.defineProperty 不能劫持新增的属性
// 修改数组的length 不能劫持
// 监听数组会有性能问题 
// $set 去解决这个问题
// 重写了数组的七个方法 pop post shift unshift reverse split
// proxy 以上问题都没有

// proxy 可以劫持13个动作 get set delete has ownKeys construct apply
// 为什么多一个receiver
// 配合reflect 反射去使用
// 1.更加语义化
// 2.同时支持13个动作做很proxy一样 reflect
import {track,trigger}from "./effect"
const reactive = <T extends Object>(target: T) => {
    // 修改数组的length 不能劫持
    return new Proxy(target, {
        // 读取
        get(target, key, receiver) {
            const res = Reflect.get(target, key)
            console.log("收集依赖", res)
            track(target,key)
            return res
        },
        // 写入
        set(target, key, value, receiver) {
            const res = Reflect.set(target, key, value)
            console.log("更新依赖", res)
            trigger(target,key,value)
            return res
        },
        // 函数调用
        apply() {

        },
    })
}

export default reactive