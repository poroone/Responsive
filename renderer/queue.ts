const queue: Set<Function> = new Set()//创建一个set队列

let isFlush = false//开关 锁
const p = Promise.resolve() //创建一个promise

export const queueJob = (job: Function) => {
    queue.add(job)
    if (!isFlush) {
        isFlush = true
        p.then(() => {
            queue.forEach(job => {
                job()
            })
            queue.clear()
            isFlush = false
        })
    }
}

export const nextTick = (fn?: () => void) => {
    return fn ? p.then(fn) : p 
}