import reactive from "../reactive/reactive"
import ref from "../reactive/ref"
import { nextTick } from "./queue"
import type Vnode from "./vnode"
import defineAsyncComponent from "./defineAsyncComponent"
const Button = {
    data() {
        return {
            name: "poro",
            age: 18
        }
    },
    props: {
        title: '123'
    },
    setup(props, { emit }) {
        let text = ref("123")
        let { name } = reactive({ name: "poro2233" })
        emit("change", text, 123123)
        const xxx = () => {
            emit("change", text, 123123)
        }


        return {
            name,
            text
        }
    }
    ,
    beforeCreate() {
        console.log("beforeCreate", this)
    },
    created() {
        console.log("Create", this.name)
    },
    beforeMount() {
        console.log("beforeMount", document.querySelector("#btn"))
    },
    mounted() {
        console.log("mounted", document.querySelector("#btn"), this.title)
    },
    beforeUpdate() {
        console.log("beforeUpdate", document.querySelector("#age").innerHTML)
    },
    updated() {
        console.log("updated", document.querySelector("#age").innerHTML)
    },
    beforeDestroy() {
        console.log("beforeDestroy")
    },
    destroyed() {
        console.log("destroyed")
    },
    render(): Vnode | Promise<Vnode> {
        const node: Promise<Vnode> = defineAsyncComponent(() => import("../component/Card"))
        // return {
        //     tag: "div",
        //     children: [
        //         {
        //             tag: "button",
        //             props: {
        //                 id: "btn10",
        //                 on: {
        //                     click: () => {
        //                         for (let i = 0; i < 50; i++) {
        //                             this.name += "改变"
        //                         }
        //                         console.log(document.querySelector("#age").innerHTML, "ppppp")
        //                         nextTick(() => {
        //                             console.log(document.querySelector("#age").innerHTML, "ppppp")
        //                         })

        //                     }
        //                 }
        //             },
        //             children: "改变" + this.text.value
        //         },
        //         {
        //             tag: "p",
        //             props: {
        //                 id: "age"
        //             },
        //             children: this.name
        //         }
        //     ]
        // }
        return node
    }
}
// 虚拟dom 自定义时间emit
// onChange =change
const heanlder = (params) => {
    console.log(params)
}
export const MyComponent = {
    tag: Button,
    props: {
        title: "123",
        onChange: heanlder
    }
}  