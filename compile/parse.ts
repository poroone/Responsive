// parse转换
import type { Token } from "./ast"
function parse(ast: Token[]) {
    console.log(ast)
    const root = {
        type: "root",
        children: []
    }
    // 创建栈结构 DFS算法 递归是没有回溯的 后入先入
    const elementStack = [root] //压入栈地  

    console.log(elementStack, "elem")
    while (ast.length) {
        const parent = elementStack.at(-1)
        const t = ast[0]
        switch (t.type) {
            case 'tag':
                // 开始标签进行添加进入栈底
                const elementNode = {
                    type: "element",
                    tag: t.name,
                    children: []
                }
                parent.children.push(elementNode)//压入栈底
                elementStack.push(elementNode)
                break;
            case "text":
                // 文字内容直接添加
                const elementTextNode = {
                    type: "text",
                    content: t.content
                }
                parent.children.push(elementTextNode)

                break;
            case "tagEnd":
                // 结束标签进行删除
                console.log(elementStack, "delete")
                elementStack.pop()
                break;

        }

        ast.shift()

    }
    return root
}
export default parse 