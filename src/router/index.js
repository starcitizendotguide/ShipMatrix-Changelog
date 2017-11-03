import Vue from 'vue'
import Router from 'vue-router'

import ChangelogPage from '@/components/changelog/Changelog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Changelog',
      component: ChangelogPage
    }
  ]
})
