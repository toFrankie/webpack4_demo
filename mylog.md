### 1. watch、devServer.hot

watch 通过监听文件变化，自动重新编译，但需要手动刷新页面才能看到效果
devServer 默认行为（devServer.hot = false）是源码被更新之后，会自动刷新页面，解决了 watch 需要手动刷新的问题。
devServer.hot 表示开启 HMR 功能，开启后，可以在不刷新整个页面的情况下，只更新被修改的模块。
但仅仅这样，类似 react 的组件状态还是会丢失，需要借助 react-hot-loader 解决。
