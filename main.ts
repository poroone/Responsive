
import reactive from "./reactive/reactive"
import { effect } from "./reactive/effect"
import { computed } from "./reactive/computed"
import watch from "./reactive/watch"
import shallowReactive from "./reactive/shallowReactive"
import {toRaw} from "./reactive/toRaw"
import ref from "./reactive/ref"
import toRef from "./reactive/toRef"


const obj = reactive({
    name: "poro",
    age: 18,
    foo:{
        bar:{
            baz:"1"
        }
    }
})
// toRef
let name=toRef(obj,"name")

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
        // document.querySelector("#app")!.innerHTML = obj.value.age as any
        document.querySelector("#app")!.innerHTML = name.value
})
const btn = document.querySelector("#btn")! as HTMLElement
const btn2 = document.querySelector("#btn2")! as HTMLElement
btn.onclick = () => {
    // console.log(obj.age)
    // obj.age++
    // console.log(obj.value.age)
    // obj.value.age++
    name.value="132"
}
btn2.onclick = () => {
    console.log(obj)
    console.log(obj2)
    console.log(toRaw(obj2))
} 
// obj.age
// obj.age = 999
// obj.age
