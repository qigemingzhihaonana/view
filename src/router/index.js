import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout
    },
		{
					path: '/01',
					name: 'dirction',
					component: () => import('@/views/dictionary/index')
    },
    // {
    //   path: '/02',
    //   name: 'bpmn',
    //   component: () => import('@/views/process/index')
    // },
  ]
})
