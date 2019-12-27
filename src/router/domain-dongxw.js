//动态路由
import Layout from '../pages/layout';

let router0 = [
    {
        path: '/customer',
        component: Layout,
        meta: {title: '客户订单', icon: 'finance', group: 'dongxw'},
        children: [
            {
                path: 'dongxw/productType/manage',
                component: require('@/pages/dongxw/productType/Manage.vue'),
                name: 'productType:manage',
                meta: {title: '产品类型', perm: 'productType:manage'}
            },
            {
                path: 'dongxw/product/manage',
                component: require('@/pages/dongxw/product/Manage.vue'),
                name: 'product:manage',
                meta: {title: '产品', perm: 'product:manage'}
            },

            {
                path: 'dongxw/customer/manage',
                component: require('@/pages/dongxw/customer/Manage.vue'),
                name: 'customer:manage',
                meta: {title: '客户信息', perm: 'customer:manage'}
            },

            {
                path: 'dongxw/order/manage',
                component: require('@/pages/dongxw/customer/Manage.vue'),
                name: 'order:manage',
                meta: {title: '客户订单', perm: 'order:manage'}
            }

        ]
    },
    {
        path: '/make',
        component: Layout,
        meta: {title: '生产制造单', icon: 'user', group: 'dongxw'},
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
    }, {
        path: '/BOM',
        component: Layout,
        meta: {title: 'BOM', icon: 'user', group: 'dongxw'},
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
        path: '/purchase',
        component: Layout,
        meta: {title: '采购订单', icon: 'user', group: 'dongxw'},
        children: [
            {
                path: 'userInfo/manage',
                component: require('@/pages/app/userInfo/Manage.vue'),
                name: 'userInfo:manage',
                meta: {title: '供应商', perm: 'user:manage'}
            },
            {
                path: 'userInfo/manage',
                component: require('@/pages/app/userInfo/Manage.vue'),
                name: 'userInfo:manage',
                meta: {title: '原料清单', perm: 'user:manage'}
            },{
                path: 'userInfo/manage',
                component: require('@/pages/app/userInfo/Manage.vue'),
                name: 'userInfo:manage',
                meta: {title: '原料分类', perm: 'user:manage'}
            },
            {
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

    {
        path: '/qry',
        component: Layout,
        meta: {title: '查询', icon: 'user', group: 'dongxw'},
        children: [{
            path: 'userInfo/manage',
            component: require('@/pages/app/userInfo/Manage.vue'),
            name: 'userInfo:manage',
            meta: {title: '查询客户订单', perm: 'user:manage'}
        }, {
            path: 'userInfo/userGrade',
            component: require('@/pages/app/userGrade/Manage.vue'),
            name: 'userGrade:manage',
            meta: {title: '查询采购订单', perm: 'userGrade:manage'}
        }, {
            path: 'userInfo/userGrade',
            component: require('@/pages/app/userGrade/Manage.vue'),
            name: 'userGrade:manage',
            meta: {title: '查询库存', perm: 'userGrade:manage'}
        },
        ]
    },
];

export default router0;
