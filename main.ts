import reactive from "./reactive/reactive"
import { effect } from "./reactive/effect"
import { computed } from "./reactive/computed"
const obj = reactive({
    name: "poro",
    age: 18
})

let test = computed(() => {
    return obj.age + obj.name
})

console.log(test)
effect(() => {
    document.querySelector("#app")!.innerHTML = test.value
})
const btn = document.querySelector("#btn")! as HTMLElement
btn.onclick = () => {
    obj.age++
}
obj.age
obj.age = 999
obj.age
