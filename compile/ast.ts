// ast抽象语法树
// <标签名称开始 
// >标签名称结束
// /标签结束名称
// tagname 标签名称 div
// 文本信息 ASDASDASDASD
// 有限状态机
const state = {
    initial: 1,//初始状态
    tagOpen: 2,//标签开始状态
    tagname: 3,//标签开始的名称
    text: 4,//文本信息
    tagEnd: 5,//标签结束状态
    tagEndName: 6//标签结束名称
}
// isAlpha 判断是否是字母 0-9数字 汉字 '空格' 目前只匹配 a-z A-Z
function isAlpha(c: string) {
    return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= "0" && c <= '9') || c === '' || RegExp(/[\u4e00-\w9fa5]/).test(c);
}

function ast(str: string) {
    const charts = [];//存放字母
    const token = [];//最后的集合 分袖之后的结果
    while (str) {
        const char = str[0]
    }
     
    return token
}

export default ast