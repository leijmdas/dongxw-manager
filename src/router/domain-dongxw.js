//动态路由
import Layout from '../pages/layout';

let router0 = [
    {
        path: '/query',
        component: Layout,
        meta: {title: '元数据管理', icon: 'user', group: 'dongxw'},
        children: [
            {
                path: 'platform/subsys/Manage',
                component: require('@/pages/platform/subsys/Manage.vue'),
                name: 'subsys:manage',
                meta: {title: '子系统', perm: 'subsys:manage'}
            },
            {
                path: 'platform/dictdata/Manage',
                component: require('@/pages/platform/dictdata/Manage.vue'),
                name: 'dictdata:manage',
                meta: {title: '数据字典', perm: 'dictdata:manage'}
            },
            {
                path: 'platform/metadata/Manage',
                component: require('@/pages/platform/metadata/Manage.vue'),
                name: 'metadata:manage',
                meta: {title: '元数据字典', perm: 'metadata:manage'}
            },
        ]
    },
    {
        path: '/audit',
        component: Layout,
        meta: {title: '审批', icon: 'user', group: 'dongxw'},
        children: [
            {
                path: 'purchasePlan/manage1',
                component: require('@/pages/dongxw/purchase/Manage.vue'),
                name: 'purchasePlan:manage1',
                meta: {title: '审核订单', perm: 'purchaseplan:manage1'}
            },
            {
                path: 'dongxw/supplier/manage1',
                component: require('@/pages/dongxw/supplier/Manage.vue'),
                name: 'supplier:manage1',
                meta: {title: '审核BOM', perm: 'supplier:manage1'}
            },

            {
                path: 'purchase/order1',
                component: require('@/pages/dongxw/supplier/Manage.vue'),
                name: 'purchase:order1',
                meta: {title: '审核采购单', perm: 'purchase:manage1'}
            },

        ]
    },

    {
        path: '/bom',
        component: Layout,
        meta: {title: 'BOM', icon: 'user', group: 'dongxw'},
        children: [
            {
                path: 'dongxw/productType/manage',
                component: require('@/pages/dongxw/productType/MainForm.vue'),
                name: 'productType:manage',
                meta: {title: '产品类型', perm: 'productType:manage'}
            },
            {
                path: 'dongxw/product/manage',
                component: require('@/pages/dongxw/product/Manage.vue'),
                name: 'product:manage',
                meta: {title: '产品清单', perm: 'product:manage'}
            },

            {
                path: 'dongxw/rmType/manage',
                component: require('@/pages/dongxw/rmType/MainForm.vue'),
                name: 'rmType:manage',
                meta: {title: '物料类型', perm: 'rmType:manage'}
            },{
                path: 'dongxw/rm',
                  component: require('@/pages/dongxw/rm/Manage.vue'),
                name: 'rm:manage',
                meta: {title: '物料清单', perm: 'rm:manage'}
            },
            {
                path: 'dongxw/bom',
                component: require('@/pages/dongxw/bom/Manage.vue'),
                name: 'bom:Manage',
                meta: {title: 'BOM表', perm: 'bom:manage'}
            },

        ]
    },
    {
        path: '/customer',
        component: Layout,
        meta: {title: '客户订单', icon: 'finance', group: 'dongxw'},
        children: [
            {
                path: 'dongxw/customer/manage',
                component: require('@/pages/dongxw/customer/Manage.vue'),
                name: 'customer:manage',
                meta: {title: '客户名单', perm: 'customer:manage'}
            },
            {
                path: 'dongxw/order/manage',
                component: require('@/pages/dongxw/order/Main.vue'),
                name: 'order:manage',
                meta: {title: '客户订单', perm: 'order:manage'}
            },
            {
                path: 'dongxw/order/custom',
                component: require('@/pages/dongxw/ordercustom/Main.vue'),
                name: 'order:custom',
                meta: {title: '报关文件', perm: 'order:manage'}
            },

            {
                path: 'dongxw/orderline/ManageQuery',
                component: require('@/pages/dongxw/orderline/ManageQuery.vue'),
                name: 'queryOrder:manage',
                meta: {title: '查询订单', perm: 'queryOrder:manage'}
            }
        ]
    },
    {
        path: '/makeplan',
        component: Layout,
        meta: {title: '生产计划表', icon: 'user', group: 'dongxw'},
        children: [

            {
                path: 'makeplan/manage',
                component: require('@/pages/dongxw/makeplan/Manage.vue'),
                name: 'makeplan:manage',
                meta: {title: '生产计划表', perm: 'makeplan:manage'}
            },
            {
                path: 'makesheet/manage',
                component: require('@/pages/dongxw/makesheet/Manage.vue'),
                name: 'makesheet:manage',
                meta: {title: '生产制造单', perm: 'makesheet:manage'}
            },
            {
                path: 'outorderpurchase/manage',
                component: require('@/pages/dongxw/outorderpurchase/Manage.vue'),
                name: 'outorderpurchase:manage',
                meta: {title: '外发采购单', perm: 'outpurchase:manage'}
            },
        ]
    },
    {
        path: '/purchase',
        component: Layout,
        meta: {title: '采购订单', icon: 'user', group: 'dongxw'},
        children: [
            {
                path: 'dongxw/supplier/manage',
                component: require('@/pages/dongxw/supplier/Manage.vue'),
                name: 'supplier:manage',
                meta: {title: '供应商名单', perm: 'supplier:manage'}
            },

            {
                path: 'purchasePlan/manage',
                component: require('@/pages/dongxw/purchase/Manage.vue'),
                name: 'purchasePlan:manage',
                meta: {title: '采购计划表', perm: 'purchaseplan:manage'}
            },
            {
                path: 'purchaseRm/manage',
                component: require('@/pages/dongxw/purchaseRm/Manage.vue'),
                name: 'purchaseRm:manage',
                meta: {title: '采购单列表', perm: 'purchase:manage'}
            },
            {
                path: 'purchaseItem/manage',
                component: require('@/pages/dongxw/purchaseItem/Manage.vue'),
                name: 'purchaseItem:manage',
                meta: {title: '供方采购单', perm: 'purchase:manage'}
            },


        ]
    },
    {
        path: 'prdSelfInv',
        component: Layout,
        meta: {title: '库存管理', icon: 'user', group: 'dongxw'},
        children: [
            {
                path: 'dongxw/monthclose/manage/?wh=10',
                component: require('@/pages/dongxw/monthclose/Manage.vue'),
                name: 'monthclose:RM',
                meta: {title: '原料成品库', perm: 'mc:rm'}
            },
            {
                path: 'dongxw/monthclose/manage/?wh=30',
                component: require('@/pages/dongxw/monthclose/Manage.vue'),
                name: 'monthclose:PO',
                meta: {title: '外购成品库', perm: 'mc:po'}
            },
            {
                path: 'dongxw/checksheet/sheet',
                component: require('@/pages/dongxw/checksheet/Manage.vue'),
                name: 'monthclose:manage30',
                meta: {title: '客户对帐单', perm: 'mc:checksheet'}
            },
            // {
            //     path: 'userInfo/userGrade2',
            //     //   component: require('@/pages/app/userGrade/Manage.vue'),
            //     name: 'userGrade:manage2',
            //     meta: {title: '入库单', perm: 'purchase:manage'}
            // },
            //
            // {
            //     path: 'userInfo/recharge',
            //     //      component: require('@/pages/app/userInfo/Manage.vue'),
            //     name: 'recharge:manage',
            //     meta: {title: '出库单', perm: 'purchase:manage'}
            // },
            // {
            //     path: 'userInfo/recharge12',
            //     //      component: require('@/pages/app/userInfo/Manage.vue'),
            //     name: 'recharge:manage12',
            //     meta: {title: '盘点', perm: 'purchase:manage'}
            // },

        ]
    },
    // {
    //     path: 'prdPurchaseInv',
    //     component: Layout,
    //     meta: {title: '外购成品库存', icon: 'user', group: 'dongxw'},
    //     children: [
    //         {
    //             path: 'dongxw/monthclose/manage',
    //             component: require('@/pages/dongxw/monthclose/Manage.vue'),
    //             name: 'monthclose:manage',
    //             meta: {title: '月结', perm: 'monthclose:manage'}
    //         },
    //
    //         {
    //             path: 'userInfo/recharge121',
    //             //      component: require('@/pages/app/userInfo/Manage.vue'),
    //             name: 'recharge:manage121',
    //             meta: {title: '成品盘点', perm: 'purchase:manage'}
    //         },
    //         {
    //             path: 'userInfo/manage61',
    //             //    component: require('@/pages/app/userInfo/Manage.vue'),
    //             name: 'userInfo:manage61',
    //             meta: {title: '成品库存', perm: 'purchase:manage'}
    //         }, {
    //             path: 'userInfo/userGrade31',
    //             //    component: require('@/pages/app/userGrade/Manage.vue'),
    //             name: 'userGrade:manage31',
    //             meta: {title: '成品入库单', perm: 'purchase:manage'}
    //         },
    //
    //         {
    //             path: 'userInfo/recharge11',
    //             //    component: require('@/pages/app/userInfo/Manage.vue'),
    //             name: 'recharge:manage11',
    //             meta: {title: '成品出库单', perm: 'purchase:manage'}
    //         }
    //     ]
    // },
    {
        path: '/ac',
        component: Layout,
        meta: {title: '应收应付款', icon: 'user', group: 'dongxw'},
        children: [
            {
                path: 'userInfo/manage7',
                //     component: require('@/pages/app/userInfo/Manage.vue'),
                name: 'userInfo:manage7',
                meta: {title: '产品应收款', perm: 'purchase:manage'}
            }, {
                path: 'userInfo/userGrade8',
                //      component: require('@/pages/app/userGrade/Manage.vue'),
                name: 'userGrade:manage8',
                meta: {title: '物料应付款', perm: 'purchase:manage'}
            },
            {
                path: 'userInfo/manage8',
                //     component: require('@/pages/app/userInfo/Manage.vue'),
                name: 'userInfo:manage8',
                meta: {title: '产品发票', perm: 'purchase:manage'}
            }, {
                path: 'userInfo/userGrade9',
                //    component: require('@/pages/app/userGrade/Manage.vue'),
                name: 'userGrade:manage9',
                meta: {title: '物料发票', perm: 'purchase:manage'}
            },
        ]
    },


];

export default router0;
