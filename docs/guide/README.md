---
sidebar: auto
---

# 目录

## 代码规范

### 通用规范

- [eslint](http://gitlab.dg.com/FrontEnd/gyzwfw/docs/blob/master/.eslintrc.js)
- js/css/html 最佳实践
- 其他

### pages(页面)

- pages 文件夹下新建页面名称文件夹
- 入口文件: main.js, main.vue

```js
├── src
│   ├── pages
│   │   ├── package                    套餐管理页
│   │   │   ├── config.vue
│   │   │   ├── default.vue
│   │   │   ├── edit.vue
│   │   │   ├── main.js                页面入口
│   │   │   ├── main.vue               页面入口
│   │   │   ├── new.vue
│   │   │   └── routes.js
```

- 所有页面 main.vue 中建议使用一个 Layout 组件, 方便页面全局调整

#### components(组件)

- 多个页面会用到的组件, 以组件名称新建文件夹, 在文件夹中新建 index.js 和 component-name.vue; 并建议在 common.js 中注册组件

```js
├── src
│   ├── components
│   │   ├── condition-select           多个页面会用到的情形选择组件
│   │   │   ├── condition-select.vue   情形选择组件
│   │   │   └── index.js               情形选择组件入口
```

- 仅某个页面用到的组件, 以页面名称新建文件夹, 在文件夹中新建 component-name.vue; 建议仅在使用到该组件的地方注册组件

```js
├── src
│   ├── components
│   │   ├── business-system            业务系统页面
│   │   │   ├── check.vue              检查组件
│   │   │   ├── edit.vue               编辑组件
│   │   │   ├── info-block.vue         信息展示组件
│   │   │   └── list.vue               列表组件
```

### routes(路由)

- 除默认路由外, 必须具备语义化, 如配置页面: config, 编辑页面: edit
- 默认路由 vue 文件: default.vue, 其他路由 vue 文件: router-name.vue

```
├── src
│   ├── pages
│   │   ├── package                    套餐管理页
│   │   │   ├── config.vue             配置路由页
│   │   │   ├── default.vue            默认路由页
│   │   │   ├── edit.vue               编辑路由页
│   │   │   ├── main.js                页面入口
│   │   │   ├── main.vue               页面入口
│   │   │   ├── new.vue                新建路由页
│   │   │   └── routes.js              路由
```

```js
export default [
  {
    path: "/",
    component: () => import("./default.vue"),
    meta: { keepAlive: true }
  },
  // 查看详情
  {
    path: "/view/:taskCode",
    component: () => import("./view.vue")
  },
  // 配置
  {
    path: "/config/:code/:deployVersion",
    component: () => import("./config.vue"),
    meta: { needRefresh: true }
  },
  // 新增
  {
    path: "/new",
    component: () => import("./new.vue"),
    meta: { needRefresh: true }
  },
  // 编辑
  {
    path: "/edit/:id",
    component: () => import("./edit.vue"),
    meta: { needRefresh: true }
  }
]
```

### vue

- template, script, style 标签之间添加换行

```html
<!--建议-->
<template> </template>

<script>
  export default {}
</script>

<style lang="less">
  .red {
  }
</style>

<!--不建议-->
<template> </template>
<script>
  export default {}
</script>
<style lang="less">
  .red {
  }
</style>
```

- template, script, style 中的代码缩进统一使用 2 个空格

### js

- vue 组件的 import 和注册名使用大写驼峰

```js
import PageLoading from "../page-loading"
// 注册方式1
vue.component("PageLoading", PageLoading)
// 注册方式2
export default {
  components: {
    PageLoading
  }
}
```

- vue 组件 import 后换行, export default 前换行

```js
// 建议
import PageLoading from "../page-loading"

const name = "test"

export default {}

// 不建议
import PageLoading from "../page-loading"
const name = "test"
export default {}
```

- import 模块建议使用规范的文件路径, 避免使用 resolve 路径, 规范的文件路径可以得到 IDE 更好的支持(引用关系, 代码高亮, 更准确的语法提示, 准确的联想等)

```js
// 建议
import helper from "../../scripts/utils/helper"
// 不建议
import helper from "@/scripts/utils/helper"
```

- action 命名: 接口请求方法 + 接口 pathname, 小写驼峰
- mutation-type 命名: action 名所有字母大写, 下划线(\_)连接

```js
  // 查询-套餐办理事项: GET {baseURL}/packages/{id}/items
  getPackagesItems: makeAction({
    type: types.GET_PACKAGES_ITEMS,
    url: 'packages/{id}/items',
  }),
  // 保存/更新-套餐办理事项: POST {baseURL}/packages/{id}/items
  postPackagesItems: makeAction({
    method: 'post',
    url: 'packages/{id}/items',
  }),
  // 删除-套餐办理事项: DELETE {baseURL}/packages/{id}/items/{conditionId}
  deletePackagesItems: makeAction({
    method: 'delete',
    url: 'packages/{id}/items/{conditionId}',
  }),
  // 排序-套餐办理事项: PUT {baseURL}/packages/{id}/items?method=sort
  putPackagesItemsResort: makeAction({
    method: 'put',
    url: 'packages/{id}/items?method=sort',
  }),
```

- state 命名: action 名去掉 get, 小写驼峰

```js
const state = {
  // --------------- 套餐管理 --------------
  // 非场景事项: getPackagesItems的state
  packagesItems: {}
}
```

- mapState 中的 key 建议换行

```js
// 建议
...mapState([
  'matterBaseInfo',
  'itemSystem',
  'materialsList',
]),

// 不建议
...mapState(['matterBaseInfo', 'itemSystem', 'materialsList']),
```

- mapActions 中的 key 建议换行

```js
// 建议
...mapActions([
  'getItemsLicenseDetail',
  'putItemsLicense',
]),

// 不建议
...mapActions(['getItemsLicenseDetail', 'putItemsLicense']),
```

- class, style 名以下划线(\_)开头

```html
<tempate>
  <div :class="_class" :style="_style">
    <div :class="_contentClass"></div>
  </div>
</tempate>

<script>
  export default {
    computed: {
      _class () {
        return [
          `${name}-wrapper`
        ];
      },
      _style () {
        return {
          color: '#fff',
        };
      },

      _contentClass () {
        return [
          `${name}-content`,
          `${name}-content-${size}`: this.size,
        ];
      },
    },
  };
</script>
```

### css

- 类名使用小写字母, 多个单词使用中横线(-)连接, 如.page-loading
- 不建议使用 scope
- 建议使用类命名空间

```html
<!-- components/package/topic-config.vue -->
<template>
  <div class="package-topic-config"></div>
</template>

<script>
  export default {}
</script>

<style lang="less">
  // 该类命名空间很重要
  .package-topic-config {
    // 所有样式写在该类命名空间下
    .flex-left {
      width: 50%;
    }
  }
</style>
```

### html

- 路由页根元素类名与文件同名(关注 class="edit")

```html
<!-- 套餐编辑路由: pages/package/edit.vue -->
<template>
  <Opener class="edit" title="编辑套餐">
    <Editor :id="$route.params.id"> </Editor>
  </Opener>
</template>
```

- 多个页面使用组件的类名与文件同名(关注 class="layout")

```html
<!-- 多个页面使用的layout组件: components/layout/layout.vue -->
<template>
  <div class="layout"></div>
</template>
```

- 单个页面使用组件的类名: 页面文件夹名-组件文件名(关注 class="package-topic-config")

```html
<!-- 仅套餐管理页使用的topic-config组件: components/package/topic-config.vue -->
<template>
  <div class="package-topic-config"></div>
</template>
```

- 2 个以上属性, 建议换行

```html
<!-- 1个属性不需要换行 -->
<div id="wrapper"></div>

<!-- 2个以上属性需要换行 -->
<div class="div" id="wrapper"></div>
```

## 二、git 规范

### branch 规范

#### 分支列表

##### master

- 受保护分支: 禁止删除, 禁止直接 push 代码
- 仅主程序员/所有者可以合并提交到 master 的 MR

#### 开发分支

- 开发者自行创建的分支

### 开发分支命名规范

> 规范格式: 分支类型/开发者昵称-开发功能描述, 例: feat/sjj-auth

#### 分支类型

- feat: 新的功能、特性
- fix: 缺陷修复
- docs: 文档更新、调整
- style: 不影响功能的样式更新、格式调整
- refactor: 功能模块的重构
- perf: 功能的性能调整
- test: 添加新的单元测试
- chore: 构建过程或辅助工具的变动，如 webpack.config.js，package.json 等
- revert: 代码回滚

#### 分支删除

- 已合并分支要及时删除

### commit 规范

> commit 规范主要体现在 commit 注释内容上

#### commit 注释内容规范

> 规范格式: 提交类型: 提交代码功能描述, 例: feat: 用户管理页删除用户功能

##### 提交类型

- feat: 新的功能、特性
- fix: 缺陷修复
- docs: 文档更新、调整
- style: 不影响功能的样式更新、格式调整
- refactor: 功能模块的重构
- perf: 功能的性能调整
- test: 添加新的单元测试
- chore: 构建过程或辅助工具的变动，如 webpack.config.js，package.json 等
- revert: 代码回滚

### tag 规范

> 每次上完生产, 需要按部署版本从 master 分支打一个 tag

### MR 规范(Merge Request)

- 开发者自测通过后, 需发起合并到 master 的 MR, 并指派合并者
- 合并者需要 review 待合并的代码, 确认无问题后再合并 MR

## 三、项目结构规范

### 文件夹结构

```
├── .eslintignore
├── .eslintrc.js                   eslintrc配置
├── .gitignore
├── README.md                      说明文档
├── babel.config.js                babelrc配置
├── commitlint.config.js           commit信息lint配置
├── package.json                   项目包依赖
├── postcss.config.js              css预处理配置
├── public                         静态资源文件夹
│   └── index.html                 entry载体html
├── src                            源代码文件夹
│   ├── components                 组件文件夹
│   ├── images                     图片文件夹
│   ├── pages                      页面文件夹(默认多页面模式)
│   │   ├── index                  首页
│   │   ├── loign                  登录页
│   ├── scripts                    脚本文件夹
│   │   ├── common.js              全局js
│   │   ├── mixins                 vue mixins文件夹
│   │   ├── use.js                 引入gdui,bizui等依赖js
│   │   └── utils                  js工具文件夹
│   ├── store                      vuex相关文件夹
│   │   ├── actions.js
│   │   ├── index.js
│   │   ├── make-action.js
│   │   ├── mutation-types.js
│   │   └── mutations.js
│   └── styles                     样式文件夹
│       ├── base                   基础样式文件夹
│       ├── import.less            引入gdui,bizui等样式less
│       ├── index.less             样式主less
│       ├── override.less          覆盖gdui,bizui等样式less
│       └── utils                  less工具文件夹, 一般包含mixin和var(不生成css)
└── vue.config.js                  vue-cli配置
```

### 文件(夹)命名规范

1. 文件(夹)命名统一使用小写(windows 文件系统不区分大小写)
2. 多个单词之间使用中划线(-)连接, 如: page-loading, print-template

### 一些说明

#### .eslintignore

1. 第三方 js 库
1. vue.config.js
1. dist
1. 其他

#### .gitignore

1. \*.zip
1. dist\*
1. package-lock.json
1. .idea, .settings, .vscode 等 IDE 配置
1. node_modules
1. 其他
