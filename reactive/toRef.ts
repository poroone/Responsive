// 使结构后的值也是支持响应式的
// 转成ref 应为已经是reactive了所以不用在track 
const toRef = <T extends object, K extends keyof T>(target: T, key: K) => {
    const wrapper = {
        _v_isRef: true,
        get value() {
            return target[key]
        },

        set value(newVal) {
            target[key] = newVal
        }
    }
    return wrapper
}

export default toRef