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
			path: '/dirction',
			name: 'Layout',
			component: Layout,
			children: [
				{
					path: '01',
					name: 'dirction',
					component: () => import('@/views/dictionary/index')
				}
			]
		}
  ]
})
