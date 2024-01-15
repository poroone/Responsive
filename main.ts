/*
 * @Author: poro poroone@163.com
 * @Date: 2024-01-08 12:56:35
 * @LastEditors: poro poroone@163.com
 * @LastEditTime: 2024-01-15 13:07:33
 * @FilePath: \my 实现满哥的c:\Users\poroo\Desktop\poroone\vuesource\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import reactive from "./reactive/reactive"
import { effect } from "./reactive/effect"
import { computed } from "./reactive/computed"
import watch from "./reactive/watch"
import shallowReactive from "./reactive/shallowReactive"
import {toRaw} from "./reactive/toRaw"
import ref from "./reactive/ref"
const obj = ref({
    name: "poro",
    age: 18,
    foo:{
        bar:{
            baz:"1"
        }
    }
})


const obj2 =shallowReactive({
    foo:{
        bar:{
            baz:"1"
        }
    }
})


// watch
watch(obj, (newVal, oldVal) => {
    console.log(newVal, oldVal, "watch")
}, {
    immediate: true,
    flush: "post"
})

// 计算属性
// let test = computed(() => {
//     return obj.age + obj.name+"computed"
// })

// console.log(test)
effect(() => {
    // document.querySelector("#app")!.innerHTML = obj.foo.bar.baz as unknown as string
    // document.querySelector("#app")!.innerHTML = obj2.foo.bar.baz 
        document.querySelector("#app")!.innerHTML = obj.value.age as any
})
const btn = document.querySelector("#btn")! as HTMLElement
const btn2 = document.querySelector("#btn2")! as HTMLElement
btn.onclick = () => {
    // console.log(obj.age)
    // obj.age++
    console.log(obj.value.age)
    obj.value.age++
}
btn2.onclick = () => {
    console.log(obj)
    console.log(obj2)
    console.log(toRaw(obj2))
} 
// obj.age
// obj.age = 999
// obj.age
