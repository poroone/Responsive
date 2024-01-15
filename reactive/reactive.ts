

import createReactive from "./proxy"
const reactive = <T extends Object>(target: T) => {
    return createReactive(target)
}

export default reactive 