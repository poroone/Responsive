import reactive from "./reactive/reactive"
import { effect } from "./reactive/effect"
import { computed } from "./reactive/computed"
import watch from "./reactive/watch"
const obj = reactive({
    name: "poro",
    age: 18
})
// watch
watch(obj, (newVal, oldVal) => {
    console.log(newVal, oldVal, "watch")
}, {
    immediate: true,
    flush: "post"
})

// for(let i=0;i<=100;i++){
//     console.log("我错了宝"+i)
// }
// 计算属性
let test = computed(() => {
    return obj.age + obj.name + "computed"
})

console.log(test)
effect(() => {
    document.querySelector("#app")!.innerHTML = test.value
})
const btn = document.querySelector("#btn")! as HTMLElement
const btn2 = document.querySelector("#btn2")! as HTMLElement
btn.onclick = () => {
    console.log(obj.age)
    obj.age++
}
btn2.onclick = () => {
    console.log(obj.age)
}
obj.age
obj.age = 999
obj.age
