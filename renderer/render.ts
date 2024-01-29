// 挂在dom 根响应式原理绑定 
import type Vnode from "./vnode"
const createRenderer = () => {
    // 打补丁
    /**
     * 
     * @param oldNode 旧节点
     * @param newNode  新节点 
     * @param container  挂载点
     * @param anchor  挂载位置
     */
    const patch = (oldNode, newNode, container, anchor = null) => {
        console.log(anchor, container, "patch")
        // 如果没有旧节点是需要挂载
        if (!oldNode) {
            mountElement(newNode, container, anchor)
        } else {
            // 更新
            const { tag } = newNode

            if (typeof tag === "string") {
                //没有旧的
                if (!oldNode) {
                    // 挂载 第一次进来没有旧元素就进行挂载
                    console.log(anchor, "123")
                    mountElement(newNode, container, anchor)
                } else {
                    // console.log(newNode, oldNode, "新旧")
                    // 热 更新 diff
                    if (typeof newNode.children === "string") {
                        // 如果是文字直接更新
                        patchChildren(oldNode, newNode, oldNode.el)
                    } else {
                        // 否则diff对比后更新
                        patchElement(oldNode, newNode)
                    }
                }
            }
        }


        // console.log(newNode, oldNode)

    }
    // 挂载节点
    const mountElement = (vnode: Vnode, container: any, anchor = null) => {
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

        insert(container, el, anchor)
    }
    // 指定插入元素
    /**
     * 
     * @param parent 父元素
     * @param el  插入的节点
     * @param arch  节点插入的位置null默认末尾 referenceNode newNode 将要插在这个节点之前
     */
    const insert = (parent: HTMLElement, el, arch = null) => {
        console.log(el, arch, "element")
        parent.insertBefore(el, arch)
    }
    // 卸载元素
    const unmount = (vnode: Vnode) => {
        // 删除
        const parent = vnode.el.parentNode
        parent && parent.removeChild(vnode.el)

    }
    // 创建元素
    const createElement = (tag: string) => {
        return document.createElement(tag) as HTMLElement
    }
    // 插入文字
    const setElementText = (el, text) => {
        return el.textContent = text
    }


    // 热更新 
    const patchElement = (oldNode, newNode) => {
        // 获取一下元素
        const el = newNode.el = oldNode.el
        // console.log(el, "el")
        // diff对比
        patchKeyChildren(oldNode, newNode, el)
        // patchChildren(oldNode, newNode, el)
    }
    // 更新内容
    const patchChildren = (oldNode: Vnode, newNode: Vnode, el) => {
        newNode.el = oldNode.el;
        if (typeof newNode.children == "string" || typeof newNode.children == "number") {
            // 更改内容
            setElementText(el, newNode.children)
        } else if (Array.isArray(newNode.children)) {
            // 循环对比更新
            newNode.children.forEach((children, index) => {
                patch(oldNode.children[index], children, el)
            })
        }
    }

    // 快速diff算发
    // 1.前序对比 key   
    // 2.尾序对比 key   因为可以节省性能如果前面的都没变只有最后一个变了 前面的循环就没有意义 前面找找 后面找找性能最优
    // 3.如果新节点多了就添加  相同长度的话无法新增
    // 4.如果新节点少了就删除  相同长度的话无法新增
    // 5.乱序 有移动 删除 添加
    //    5.1 5没了的进行删除
    //    5.2 多了一个7要添加
    //    5.3 可能会移动  3 4不变 2挪到7的前面  
    //    5.4通过最长递增子序列升序算法来进行求出最小移动
    //    图片在image diff乱序对比图
    // 尽可能服用元素 因为创建元素的代价很打属性很多 还会进行页面插入dom回流重绘 
    // 核心思想 服用已有dom修改内容 ,
    // 不理想情况 删除所有子集重新创建
    const patchKeyChildren = (oldVnode: Vnode, newVnode: Vnode, el) => {
        // oldVnode  旧的
        // newVnode  新的
        // el   元素 挂载点
        const oldChildren = oldVnode.children
        const newChildren = newVnode.children

        let j = 0; //从头开始的指针
        let oldVnodeChildren = oldChildren[j] as Vnode
        let newVnodeChildren = newChildren[j] as Vnode
        // 前序对比
        while ((oldVnodeChildren && newVnodeChildren) && (oldVnodeChildren.key === newVnodeChildren.key)) {
            // 没变化就更新
            patch(oldVnodeChildren, newVnodeChildren, el)
            j++
            oldVnodeChildren = oldChildren[j] as Vnode
            newVnodeChildren = newChildren[j] as Vnode
        }

        // 尾序对比
        let oldEnd = oldChildren.length - 1
        let newEnd = newChildren.length - 1
        oldVnodeChildren = oldChildren[oldEnd] as Vnode
        newVnodeChildren = newChildren[newEnd] as Vnode

        while ((oldVnodeChildren && newVnodeChildren) && (oldVnodeChildren.key === newVnodeChildren.key)) {
            // 没变化就更新
            patch(oldVnodeChildren, newVnodeChildren, el)
            oldEnd--
            newEnd--
            oldVnodeChildren = oldChildren[oldEnd] as Vnode
            newVnodeChildren = newChildren[newEnd] as Vnode
        }

        // 插入 j大于旧节点 j小于新节点 插入有新增的
        if (j > oldEnd && j <= newEnd) {
            const archIndex = newEnd + 1;//要插到哪

            let anchor
            if (typeof newChildren != 'string') {
                // console.log(newChildren[archIndex])
                anchor = archIndex < newChildren.length ? newChildren[archIndex].el : null
            } else {
                anchor = null
            }
            while (j <= newEnd) {
                // patch 会调用inster
                // console.log(el)
                patch(null, newChildren[j++], el, anchor)
            }
            // insert(el, anchor)
        } else if (j > newEnd && j <= oldEnd) {
            // 卸载操作
            while (j <= oldEnd) {
                unmount(oldChildren[j++] as Vnode)
            }
        } else {
            // image中映射表 就节点的key对应新节点的下标
            // 移动 新增 删除
            // 求出那几个需要处理 
            const count = newEnd - j + 1
            const source = new Array(count).fill(-1)
            // -1 就代表有新增的
            const newStart = j
            const oldStart = j
            let moved = false //检车有没有移动的
            const keyIndex = new Map()
            keyIndex

            for (let i = newStart; i <= newEnd; i++) {
                if (typeof newChildren != "string") {
                    // key index 索引表
                    keyIndex.set(newChildren[i].key, i)
                }
            }
            let patchd = 0 //已处理过的节点统计 不要重复处理
            let pos = 0 //最长递增子序列 前面的节点 太靠后不想移动 前面的快
            for (let i = oldStart; i <= oldEnd; i++) {
                oldVnode = oldChildren[i] as Vnode  //旧的vnode
           
                if (patchd < count) {
                    // 找到可以服用的节点
                    const k = keyIndex.get(oldVnode.key)
               
                    if (k != undefined) {
                        newVnode = newChildren[k] as Vnode
                        patch(oldVnode, newVnode, el)
                        patchd++
                        source[k-newStart]=i
                        // 2 3 1 -1 -1
                        // key (3-1=2 1-1=0 2-1=1)
                        // source 去给seq提供 去求最长递增子序列
                        // 通过最长递增子序列 就能找到那个节点要移动
                        console.log(source)
                    }
                }
            }

            console.log(keyIndex)
        }
    }


    const render = (Vnode: Vnode, container: any) => {
        if (Vnode) {
            // 进行deff算法
            patch(container._vnode, Vnode, container)
        } else {
            // 只有旧节点没有新节点进行卸载
            if (container._vnode) {
                unmount(container._vnode)
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