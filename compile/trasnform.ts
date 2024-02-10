import type Vnode from "../renderer/vnode"

function trasnform(root) {
    const vnode: Vnode = {
        tag: root.tag || "div",
        children: []
    }

    if (root.children && root.type === "element" || root.type === "root") {
        root.children.forEach(child => {
            let r = trasnform(child)

            if (typeof r == "string") {
                vnode.children = r
            } else {
                if (typeof vnode.children != "string") {
                    vnode.children.push(r)
                }

            }
        })
    }
    if (root.type === "text") {
        return root.content
    }
    return vnode
}

export default trasnform