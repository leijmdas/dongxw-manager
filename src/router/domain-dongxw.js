//动态路由
import Layout from '../pages/layout';

let router0 = [
    {
        path: '/customer',
        component: Layout,
        meta: {title: '客户订单', icon: 'finance', group: 'dongxw'},
        children: [
            {
                path: 'businessInfo/manage',
                component: require('@/pages/app/businessInfo/Manage.vue'),
                name: 'businessInfo:manage',
                meta: {title: '客户信息', perm: 'userGrade:manage'}
            },
            {
                path: 'checkMerchant/manage',
                component: require('@/pages/app/checkMerchant/Manage.vue'),
                name: 'checkMerchant:manage',
                meta: {title: '产品', perm: 'userGrade:manage'}
            },
            {
                path: 'merchantOrder/manage',
                component: require('@/pages/app/merchantOrder/Manage.vue'),
                name: 'merchantOrder:manage',
                meta: {title: '客户订单', perm: 'userGrade:manage'}
            }]
    },

    {
        path: '/purchase',
        component: Layout,
        meta: {title: '采购订单', icon: 'user', group: 'dongxw'},
        children: [{
            path: 'userInfo/manage',
            component: require('@/pages/app/userInfo/Manage.vue'),
            name: 'userInfo:manage',
            meta: {title: '原料清单', perm: 'user:manage'}
        }, {
            path: 'userInfo/userGrade',
            component: require('@/pages/app/userGrade/Manage.vue'),
            name: 'userGrade:manage',
            meta: {title: 'BOM树', perm: 'userGrade:manage'}
        },

            {
                path: 'userInfo/recharge',
                component: require('@/pages/app/userInfo/Manage.vue'),
                name: 'recharge:manage',
                meta: {title: '采购订单', perm: 'userGrade:manage'}
            }

        ]
    },
    {
        path: '/inv',
        component: Layout,
        meta: {title: '库存管理', icon: 'user', group: 'dongxw'},
        children: [{
            path: 'userInfo/manage',
            component: require('@/pages/app/userInfo/Manage.vue'),
            name: 'userInfo:manage',
            meta: {title: '库存', perm: 'user:manage'}
        }, {
            path: 'userInfo/userGrade',
            component: require('@/pages/app/userGrade/Manage.vue'),
            name: 'userGrade:manage',
            meta: {title: '入库单', perm: 'userGrade:manage'}
        },

            {
                path: 'userInfo/recharge',
                component: require('@/pages/app/userInfo/Manage.vue'),
                name: 'recharge:manage',
                meta: {title: '出库单', perm: 'userGrade:manage'}
            }

        ]
    },
    {
        path: '/ac',
        component: Layout,
        meta: {title: '应收应付', icon: 'user', group: 'dongxw'},
        children: [{
            path: 'userInfo/manage',
            component: require('@/pages/app/userInfo/Manage.vue'),
            name: 'userInfo:manage',
            meta: {title: '应收款', perm: 'user:manage'}
        }, {
            path: 'userInfo/userGrade',
            component: require('@/pages/app/userGrade/Manage.vue'),
            name: 'userGrade:manage',
            meta: {title: '应付款', perm: 'userGrade:manage'}
        },
        ]
    },
];

export default router0;
