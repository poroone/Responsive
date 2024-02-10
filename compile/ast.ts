// ast抽象语法树
// <标签名称开始 
// >标签名称结束
// /标签结束名称
// tagname 标签名称 div
// 文本信息 ASDASDASDASD
// 有限状态机
const state = {
    initial: 1,//初始状态 
    tagOpen: 2,//标签开始状态  <
    tagName: 3,//标签开始的名称 < xxxx
    text: 4,//文本信息
    tagEnd: 5,//标签结束状态 /
    tagEndName: 6//标签结束名称 >
}
// isAlpha 判断是否是字母 0-9数字 汉字 '空格' 目前只匹配 a-z A-Z
function isAlpha(c: string) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= "0" && c <= '9') || c === '' || RegExp(/[\u4e00-\w9fa5]/).test(c);
}
export interface Token {
    type: 'tag' | 'text' | 'tagEnd' 
    name?: string
    content?: string
}
function ast(str: string):Token[] {
    let currentState = state.initial //默认是初始化状态
    const charts = [];//存放字母
    const tokens:Token[] = [];//最后的集合 分袖之后的结果
    while (str) {
        const char = str[0]
        switch (currentState) {
            //  初始化
            case state.initial:
                // 看看是不是\\ < 
                if (char == "<") {
                    currentState = state.tagOpen
                    str = str.slice(1)
                } else if (isAlpha(char)) {
                    // 不是<是个文本
                    currentState = state.text//更改状态
                    charts.push(char)//添加
                    str = str.slice(1)//消费
                }
                break;
            // 标签开始的状态 <
            case state.tagOpen:
                if (isAlpha(char)) {
                    // 准备记录 名称了
                    currentState = state.tagName
                    charts.push(char)//添加
                    str = str.slice(1)
                } else if (char == "/") {
                    //标签结束状态
                    currentState = state.tagEnd
                    str = str.slice(1)
                }
                break;
            // 标签开始的名称  < XXX
            case state.tagName:
                // 是<后面的字母
                if (isAlpha(char)) {
                    charts.push(char)
                    str = str.slice(1)
                } else if (char == ">") {
                    // 结束标签
                    currentState = state.initial
                    tokens.push({ type: 'tag', name: charts.join('') })
                    charts.length = 0
                    str = str.slice(1)
                }
                break;
            // 字符内容  xxxxx
            case state.text:
                if (isAlpha(char)) {
                    charts.push(char)
                    str = str.slice(1)
                } else if (char == "<") {
                    // 结束
                    currentState = state.tagOpen
                    tokens.push({ type: "text", content: charts.join("") })
                    charts.length = 0
                    str = str.slice(1)
                }
                break;
            // /
            case state.tagEnd:
                if (isAlpha(char)) {
                    currentState = state.tagEndName
                    charts.push(char)
                    str = str.slice(1)
                }
                break;
            // >
            case state.tagEndName:
                if (isAlpha(char)) {
                    charts.push(char)
                    str = str.slice(1)
                } else if (char == ">") {
                    currentState = state.initial
                    tokens.push({ type: "tagEnd", name: charts.join("") })
                    charts.length = 0
                    str = str.slice(1)
                }
        }
    }
    return tokens
}

export default ast