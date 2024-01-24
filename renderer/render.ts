// 挂在dom 根响应式原理绑定 
import type Vnode from "./vnode"
const createRenderer = () => {
    // 挂载节点
    const mountElement = (vnode: Vnode, container: any) => {
        // 创建一下vnode的元素
        const el = createElement(vnode.tag)
        vnode.el = el
        // 如果children是字符串或者数字就进行插入
        if (typeof vnode.children == "string" || typeof vnode.children == "number") {
            setElementText(el, vnode.children)
        } else if (Array.isArray(vnode.children)) {
            // 如果是数组进行递归
            vnode.children.forEach(child => {
                patch(null, child, el)
            })
        }
        insert(container, el)
    }
    // 指定插入元素
    /**
     * 
     * @param parent 父元素
     * @param el  插入的节点
     * @param arch  节点插入的位置null默认末尾 referenceNode newNode 将要插在这个节点之前
     */
    const insert = (parent: HTMLElement, el, arch = null) => {
        parent.insertBefore(el, arch)
    }
    // 卸载元素
    const unmount = (el: HTMLElement) => {
        el.innerHTML = ''

    }
    // 创建元素
    const createElement = (tag: string) => {
        return document.createElement(tag) as HTMLElement
    }
    // 插入文字
    const setElementText = (el, text) => {
        return el.textContent = text
    }
    // 打补丁
    /**
     * 
     * @param oldNode 旧节点
     * @param newNode  新节点 
     * @param container  挂载点
     */
    const patch = (oldNode, newNode, container) => {
        // 如果没有旧节点是挂在
        if (!oldNode) {
            mountElement(newNode, container)

        } else {
            const { tag } = newNode
            console.log(tag);
            if (typeof tag === "string") {
                // 
                if (!oldNode) {
                    mountElement(newNode, container)
                } else {
                    // 热更新
                    patchElement(oldNode, newNode)
                }
            }
        }


        console.log(newNode, oldNode)

    }
    // 热更新
    const patchElement = (oldNode, newNode) => {
        const el = newNode.el = oldNode.el
        console.log(el, "el")
        patchChildren(oldNode, newNode, el)
    }
    // 
    const patchChildren = (oldNode: Vnode, newNode: Vnode, el) => { 
        if (typeof newNode.children == "string" || typeof newNode.children == "number") {
            // 更改内容
            setElementText(el, newNode.children)
        } else if (Array.isArray(newNode.children)) {
            newNode.children.forEach((children,index) => {
                patch(oldNode.children[index], children, el)
            })
        }
    }
    const render = (Vnode: Vnode, container: any) => {
        if (Vnode) {
            // 进行deff算法
            patch(container._vnode, Vnode, container)
        } else {
            // 只有旧节点没有新节点进行卸载
            if (container._vnode) {
                unmount(container)
            }
        }
        // 存一个旧的进行对比
        container._vnode = Vnode
    }
    return {
        render
    }
}

export default createRenderer