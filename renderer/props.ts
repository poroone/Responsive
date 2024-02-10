

const resolveProps = (propsOptions, propsData) => {
    const props = {}
    const attrs = {}
    for (const key in propsData) {

        const value = propsData[key]

        if (key in propsOptions || key.startsWith('on')) {
            // 存入props
            console.log(key, 132)
            props[key] = value
        } else {
            attrs[key] = value
        }
    }
    return [props, attrs]
}
export default resolveProps 