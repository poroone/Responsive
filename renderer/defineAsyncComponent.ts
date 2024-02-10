// 异步组件 

async function defineAsyncComponent(loader) {
    console.log(loader)
    const c = await loader()
    const node = c.default?.render?.() ?? {
        tag: "div",
        children: "异步组件加载失败"
    }
    return node
}

export default defineAsyncComponent 