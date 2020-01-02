//动态路由
import Layout from '../pages/layout'

let router0 = [{
  path: '/base0',
  component: Layout,
  meta: { title: '财务报表', icon: 'parking', group: 'report' },
  children: [{
    path: 'userInfo/manage2',
    component: require('@/pages/app/userInfo/Manage.vue'),
    name: 'userInfo:manage2',
    meta: { title: '对帐记录' }
  }, {
    path: 'userInfo/manage3',
    component: require('@/pages/app/userInfo/Manage.vue'),
    name: 'userInfo:manage3',
    meta: { title: '提现记录' }
  }, {
    path: 'userInfo/manage4',
    component: require('@/pages/app/userInfo/Manage.vue'),
    name: 'userInfo:manage4',
    meta: { title: '发票记录' }
  }]
}]

export default router0;
