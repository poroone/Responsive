import reactive from "./reactive"
/**
 * 
 * @param target 判断是否是引用数据类型
 * @returns 
 */
export const isObject = <T extends object>(target: T) => typeof target === "object" && target !== null 

//  ref 如果接受的是个对象也是调用reactive
export const toReactive=(target:any)=>{
    if(isObject(target)){
        return reactive(target)
    }
    return target
}