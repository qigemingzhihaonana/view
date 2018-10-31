// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import './icon'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress' // Progress 进度条
import './mock'

Vue.use(ElementUI)

NProgress.configure({ showSpinner: false })

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
}
)

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
	store,
  components: { App },
  template: '<App/>'
})
