//动态路由
import Layout from '../pages/layout'

let router0 = [{
    path: '/office',
    component: Layout,
    meta: {title: '自动办公', icon: 'finance', group: 'office'},
    children: [{
        path: 'office/manageInfo',
        //component: require('@/pages/app/userInfo/Manage.vue'),
        name: 'office:manage2',
        meta: {title: '个人信息'}
    }, {
        path: 'office/manageTimer',
        //component: require('@/pages/app/userInfo/Manage.vue'),
        name: 'office:manageTimer',
        meta: {title: '定期提醒'}
    }]
}]


export default router0;
