
interface Component {
    props?: Record<any, any>

    data(): object
    render(): Vnode
    beforeCreate?()
    created?()
    beforeMount?()
    mounted?()
    beforeUpdate?()
    updated?()
    beforeDestroy?()
    destroyed?()
    setup(props?: Record<any, any>, context?: any): object
}
interface Instance {
    state?: object
    isMounted: boolean
    subTree?: Vnode
}
//  Vnode 虚拟dom
class Vnode {
    tag: string | Component//标签
    el?: HTMLElement//真实dom
    props?: Record<any, any>  //属性
    key?: string | number  //key
    children?: Vnode[] | string  //子
    component?: Instance
}

export default Vnode