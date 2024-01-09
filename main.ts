import reactive from "./reactive/reactive"
import { effect } from "./reactive/effect"
const obj = reactive({
    name: "poro",
    age: 18
})

effect(() => {
    document.querySelector("#app")!.innerHTML = obj.name + obj.age
})
const btn = document.querySelector("#btn")! as HTMLElement
btn.onclick = () => {
    obj.age++
}
obj.age
obj.age = 999
obj.age
