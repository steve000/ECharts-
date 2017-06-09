import Vue from 'vue'
import Router from 'vue-router'
import rundata from '@/components/rundata'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'rundata',
      component: rundata
    }
  ]
})
