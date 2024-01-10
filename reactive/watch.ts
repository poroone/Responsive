import { effect } from "./effect"
interface Options {
    immediate?: boolean
    flush?: "sync" | "post"
}
const traverse = (target: any, seen = new Set()) => {
    if (typeof target !== "object" || target === "null" || seen.has(target)) return
    seen.add(target)
    for (const key in target) {
        traverse(target[key], seen)
    }
    return target


}
const watch = (source, cb: Function, options?: Options) => {
    let getters: Function
    if (typeof source === "function") {
        getters = source
    } else {
        getters = () => traverse(source)
    }
    let newVal, oldVal;
    const job = () => {
        newVal = effectFn() //新的值  
        cb(newVal, oldVal)//旧的值 新的值
        oldVal = newVal //下一次的
    }
    //post 组件更新之后执行
    // dom更新是异步的
    const floshPostCallbacks = () => {  //异步promise 
        Promise.resolve().then(job)
    }
    const effectFn = effect(getters, {
        lazy: true,
        scheduler: job//更新的时候执行
    })
    // 立即执行配置项
    if (options && options.immediate) {
        options.flush == "post"
            ?floshPostCallbacks()
            :job()


    } else {
        oldVal = effectFn() //默认值 一进来就执行的  
    }

}


export default watch