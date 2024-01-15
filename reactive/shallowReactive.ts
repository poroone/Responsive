// 浅层次监听 只监听第一层
import createReactive from "./proxy"

const shallowReactive =<T extends object>(target:T)=>{
   return createReactive(target,true)
}

export default shallowReactive