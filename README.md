# Small 商城项目

## 1. 项目初始化

- 使用 vue-cli3 创建项目，预编译语言使用的是 less

- 删除一些不需要的文件并创建自己项目中需要的目录（common、network）

- 准备项目需要的图片放在 assets 的 img 中

- 创建 base.less 初始化基本的样式，定义几个常用的变量，方便使用

- 测试项目是否有误，并把项目提交到 github https://github.com/java0088/small.git

- 创建 vue.config.js 配置路径别名

  ## 2.项目模块的划分

  #### 2.1 划分目录结构

  #### 2.2 项目模块划分：tabbar -> 路由映射关系

  #### 2.3 创建是个主要的模块（home、category、cart、profile）

## 3.项目首页的制作(hemo.vue)

#### 一. 封装公共的头部导航**(NavBar)**组件

#### 二. 封装公共的轮播图**(swiper)**组件

#### 三. 封装独立的推荐**(RecommendView)**组件

1. div>a>img

#### 四. 封装独立的导航控制组件**(TabControl)**组件

        4.1 基本结构的封装
        4.2 监听点击
        4.3 props -> title
        4.4 div>根据 titles v-for 遍历 div->span{{title}}
        4.5 选中哪一个 tab，哪个 tab 的文字变色，并添加 border-bottom,利用 currentInde 控制

#### 五. 首页的商品数据请求

##### 5.1 设计数据结构，用于保存数据

```
 goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
```

##### 5.2 发送数据请求

- 在 hom.js 中封装 getHomeGoods(type,page)

- 在 home.vue 中的 methods 中 js 中封装 getHomeGoods(type)

- 调用 js 中封装 getHomeGoods('pop')/getHomeGoods('new')/getHomeGoods('sell')
- 获取到 res

##### 5.3 封装 GoodsList 和 GoodsListItem

- 展示商品列表，封装 GoodsList
- 列表中每一个商品，封装 GoodsListItem
- 注意 CSS 属性的设置即可

##### 5.4. 滚动的封装 Scroll

- 学习 BetterScroll 的使用
- 安装 better-scroll
- 封装一个独立的组件，用于作为滚动组件：Scroll
- 组件内代码的封装：
  - 1.创建 BetterScroll 对象，并且传入 DOM 和选项（probeType、click、pullUpLoad）
  - 2.监听 scroll 事件，该事件会返回一个 position
  - 3.监听 pullingUp 事件，监听到该事件进行上拉加载更多
  - 4.封装刷新的方法：this.scroll.refresh()
  - 5.封装滚动的方法：this.scroll.scrollTo(x, y, time)
  - 6.封装完成刷新的方法：this.scroll.finishedPullUp

##### 5.5. 上拉加载更多

- 通过 Scroll 监听上拉加载更多。
- 在 Home 中加载更多的数据。
- 请求数据完成后，调动 finishedPullUp

##### 5.6. 返回顶部

- 封装 BackTop 组件
- 定义一个常量，用于决定在什么数值下显示 BackTop 组件
- 监听滚动，决定 BackTop 的显示和隐藏
- 监听 BackTop 的点击，点击时，调用 scrollTo 返回顶部

#### 六.解决 better-scroll 滚动的问题

- Better-Scroll 在决定有多少区域可以滚动是,是根据 scrollHeight 属性决定的

  1.  scrollHeight 属性是根据方 Better-Scroll 中的子组件的高度
  2.  但是我们首页中,刚开始在计算 scrollHeight 属性是，是没有将图片计算在内的
  3.  后来图片加载进来的时候有了新高度，但是 scrollHeight 属性并没有进行更新
  4.  所以出现了滚动问题

- 解决问题

  1.  监听每一张图片是否加载完成，只要有一张图片加载完成了就执行 refresh 函数
  2.  如何监听图片加载完成了？

      - 原生的 js 监听图图片:img.onload = function(){}
      - vue 中监听:@load="方法"

  3.  调用 scroll 的 refresh()

- 将 GoodsListItem 中的事件传入到 Hemo 中
  1. 因为涉及到非父子组件之间的通信，所以这里哦们选择了事件总线
  2. bus->总线
  3. Vue.prototype.\$but = new Vue()
  4. this.$but.$emit('事件名')发送事件
  5. this.$bus.$on('事件名)监听事件
- 对于 refresh 飞猪频繁的问题，进行防抖操作
  1. 防抖 debounce/节流 throttle
  2. 防抖函数起作用的过程
      - 如果我们直接执行 refresh 函数，呢么 refresh 函数会被执行 30 次

      - 可以将 refresh 函数传入到 debounce 函数中，生成一个新的函数

      - 之后在调用非常频繁的时候，就使用新生成的函数

      - 而新生成的函数，并不会非常频繁的调用，如果下一次执行的非常快，那么会将上一次取消掉
            

        ```
          deBounce(func, delay) {
              let timer = null
              return function (...args) {
                if (timer) clearTimeout(timer)
                timer = setTimeout(() => {
                  func.apply(this, args)
                }, delay)
              }
            }
        ```

        
