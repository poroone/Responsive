// 副作用函数 
// 里面的值可以被外界所影响 产生副作用不确定性
//纯函数 immer.js 不可变数据实现 lmmutavle.js
// 里面的值不能被外界所影响,不论什么环境下都是独立的

interface Options {
    scheduler?: Function
    lazy: boolean
}
let activeEffect;

export const effect = (fn: Function, options?: Options) => {
    const _effect = () => {
        activeEffect = _effect
        let res = fn()
        return res
    }
    _effect.options = options
    if (options && options.lazy) {
        return _effect
    } else {
        _effect()
        return _effect
    }
}

const targetMap = new WeakMap()
// WeakMp是弱引用
// WeakMap key只能是对象 target={name:"poro",age:20}  value 是Map 
// map的key =name value是 set结构
// set effect

// 依赖收集 
export const track = (target: object, key) => {
    let depsMap = targetMap.get(target)
    //没值初始化为map 
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }

    let deps: Set<Function> = depsMap.get(key)

    if (!deps) {
        deps = new Set()
        depsMap.set(key, deps)
    }
    deps.add(activeEffect)
    // 更新依赖
}


// 更新依赖
export const trigger = (target, key, value: any) => {

    const depsMap = targetMap.get(target)
    const deps: Set<any> = depsMap.get(key)
    console.log(depsMap, deps)
    deps.forEach((fn) => {
        if(fn&&fn.options&&fn.options.scheduler){s
            fn.options.scheduler(fn)
        }else{
            fn()
        }
    })

}











// 1.递归赋值给新的对象 DFS算法 比较浪费性能
// 2.JSON.parse(JSON.stringify(xxx))  会丢掉undefined 
// 3.window.structuredClone() //新增的api node18版本以上 高版本
// 4. Immutable js
// 在调用 obj.a.b.c 会对其进行单独解除引用 
const xxx = (obj: Object) => {
    let createObj = {}
    for (let key in obj) {
        if (typeof obj[key] === "object") {
            xxx(obj[key])
        } else {
            createObj[key] = obj[key]
        }

    }
    return createObj
}
let object = xxx({ 123: 132 })
let obj = {
    x: {},
    s: {},
    a: {
        b: {
            c: {}
        }
    }
}
