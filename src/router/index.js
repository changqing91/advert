import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Team from '@/pages/Team'
import Sign from '@/pages/Sign'
import Buy from '@/pages/Buy'
import Detail from '@/pages/Detail'
import Intro from '@/pages/Introduction'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/team',
    name: 'Team',
    component: Team
  },
  {
    path: '/intro',
    name: 'Intro',
    component: Intro
  },
  {
    path: '/sign',
    name: 'Sign',
    component: Sign
  },
  {
    path:'/buy',
    name: 'Buy',
    component: Buy
  },
  {
    path:'/detail',
    name: 'Detail',
    component: Detail
  }
]

export default new Router({
  routes,
  mode: 'history'
})
