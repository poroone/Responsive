## reactive 响应器
### reactive
通过调用proxy 进行对数据劫持更新和收集 set get 
调用effect 中的 trigger 和track 进行依赖 更新依赖 和收集依赖


### effect 

封装了 effect 副作用函数 , trigger 和track 进行依赖 更新依赖 和收集依赖

### computed
计算属性 
值变化所依赖的页面也跟着变化 通过effect来进行页面更新

### proxy 

对数据进行get set响应式
通过track 和trigger 进行收集和更新

### reactive
统一调用 reactive进行复杂类型添加响应式

### ref 
基本数据类型和复杂数据类型都可以进行响应通过.value

### shallowReactive 
浅层次响应 只会响应第一层

### toRaw
响应对象
返回原始对象
 
### toRef 
使结构后的值也支持响应式
### toRefs
把每个refs转换成ref
### utils
isObject 判断是否是对象
toReactive 如果是个对象调用 reactive
### watch

## render 渲染器
    

### defineAsyncComponent.ts
异步组件可以对组件异步引入 可以用于骨架屏 并且会进行代码分包 单独拆分成js不对打到主包里
### component.ts
组件
### emit.ts
传值 存储到props中
### props.ts
传值
### queue.ts
nextTick 
### vNode.ts
 用来描述节点的
### render.ts
渲染器
#### getSequence 
最长递增子序列算法
#### patch
 用来打补丁虚拟dom对比
#### mountElement
 挂载节点
#### insert
 插入元素
      @param parent 父元素
      @param el  插入的节点
      @param arch  节点插入的位置null默认末尾 referenceNode newNode 将要插在这个节点之前
#### unmount
 卸载节点
#### createElement
 创建元素
#### setElementText
 插入文字
#### patchElement
 热更新
#### patchChildren
 更新内容
#### patchKeyChildren
 快速diff算法
 oldVnode  旧的
 newVnode  新的
 el   元素 挂载点
 #### render
 渲染
### diff 算法 
 前序对比 :从数组第一个对比key一样的就直接复用 调用patch
 尾序对比 :从数组最后一个对比key一样的就直接复用 调用patch
 乱序对比 :移动的 删除的 新增的 
 
## 编译器

