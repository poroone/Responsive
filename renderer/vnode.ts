
//  Vnode 虚拟dom
class Vnode {
    tag: string//标签
    el?: HTMLElement//真实dom
    props?: Record<any, any>  //属性
    key?: string | number  //key
    children?: Vnode[] | string | number //子
}

export default Vnode