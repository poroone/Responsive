// event 事件,instance 事件调用 ,参数
function emit(event, instance, ...args) {
    const props = instance.props;

    const e = props[`on${event[0].toUpperCase() + event.slice(1)}`]

    e(...args)

}

export default emit