import reactive from "./reactive/reactive"
const obj = reactive({
    name: "poro",
    age: 18
})


obj.age
obj.age = 999
obj.age
