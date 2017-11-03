import Vue from 'vue'
import Router from 'vue-router'

import ChangelogPage from '@/components/changelog/Index'
import ComparePage from '@/components/compare/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Changelog',
      component: ChangelogPage
    },
    {
      path: '/compare',
      name: 'Compare',
      component: ComparePage
    }
  ]
})
