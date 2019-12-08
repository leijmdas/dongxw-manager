// 动态路由
import Layout from '../pages/layout'

let router0 = [{
    path: '/crm',
    component: Layout,
    meta: {title: '会员及商户', icon: 'user', group: 'crm'},
    children: [{
        path: 'userInfo/manage',
        component: require('@/pages/app/userInfo/Manage.vue'),
        name: 'userInfo:manage',
        meta: {title: '用户管理'}
    }, {
        path: 'merchant/manage',
        component: require('@/pages/app/merchantInfo/Manage.vue'),
        name: 'merchant:manage',
        meta: {title: '商户管理'}
    }, {
        path: 'corp/manage',
        component: require('@/pages/app/corpInfo/Manage.vue'),
        name: 'corp:manage',
        meta: {title: '企业管理'}
    }]
},{
    path: '/act',
    component: Layout,
    meta: {title: '活动及营销', icon: 'promotion', group: 'crm'},
    children: [{
        path: 'promotionInfo/manage',
        component: require('@/pages/app/act/promotionInfo/Manage.vue'),
        name: 'promotion:manage',
        meta: {title: '优惠管理'}
    }, {
        path: 'promotionCoupon/manage',
        component: require('@/pages/app/act/promotionCoupon/Manage.vue'),
        name: 'coupon:manage',
        meta: {title: '优惠券'}
    }]
}]

export default router0;
