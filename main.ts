
import reactive from "./reactive/reactive"
import { effect } from "./reactive/effect"
import { computed } from "./reactive/computed"
import watch from "./reactive/watch"
import shallowReactive from "./reactive/shallowReactive"
import { toRaw } from "./reactive/toRaw"
import ref from "./reactive/ref"
import toRef from "./reactive/toRef"
import type Vnode from "./renderer/vnode"
import toRefs from "./reactive/toRefs"
import createRenderer from "./renderer/render"

const app = document.querySelector("#app")

const obj = reactive({
    name: "poro",
    age: 18,
    foo: {
        bar: {
            baz: "1"
        }
    }
})
let { name, age } = toRefs(obj)

console.log(app)
// 变成响应式的
effect(() => {
    const vnode: Vnode = {
        tag: "div",
        props: {
            id: "test"
        },
        children: [
            {
                tag: "p",
                children: obj.name,
                key:1
            },
            {
                tag: "span",
                children: obj.age,
                key:2
            }
        ]
    }

    const renderer = createRenderer()
    renderer.render(vnode, app)
})
















// toRef
// let name = toRef(obj, "name")

// const obj2 = shallowReactive({
//     foo: {
//         bar: {
//             baz: "1"
//         }
//     }
// })


// watch
// watch(obj, (newVal, oldVal) => {
//     console.log(newVal, oldVal, "watch")
// }, {
//     immediate: true,
//     flush: "post"
// })

// 计算属性
// let test = computed(() => {
//     return obj.age + obj.name+"computed"
// })

// console.log(test)
// effect(() => {
//     // document.querySelector("#app")!.innerHTML = obj.foo.bar.baz as unknown as string
//     // document.querySelector("#app")!.innerHTML = obj2.foo.bar.baz 
//     // document.querySelector("#app")!.innerHTML = obj.value.age as any
//     document.querySelector("#app")!.innerHTML = vnode
// })
const btn = document.querySelector("#btn")! as HTMLElement
const btn2 = document.querySelector("#btn2")! as HTMLElement
btn.onclick = () => {
    // console.log(obj.age)
    obj.age++
    // console.log(obj.value.age)
    // obj.value.age++
    // name.value = "132"
}
btn2.onclick = () => {

    obj.name="你好"
    // console.log(obj2)
    // console.log(toRaw(obj2))
}
// obj.age
// obj.age = 999
// obj.age
