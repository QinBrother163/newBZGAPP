import Vue from 'vue'
import Router from 'vue-router'
import InvesmentDetail from 'src/components/investment/invesmentDetail'

Vue.use(Router)
    //采用异步加载形式
export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'root',
            redirect: { name: 'home' }
        },
        {
            path: '/home',
            name: 'home',
            component: resolve => require(['src/components/home/home'], resolve),
            children: [
                {
                    path: 'invesmentDetail',
                    component: InvesmentDetail
                }
            ]
        },
        {
            path: '/systemMsg',
            component: resolve => require(['src/components/home/systemMsg'], resolve)
        },
        {
            path: '/login',
            name: 'login',
            component: resolve => require(['src/components/login/login'], resolve),
            children: [{
                    path: 'resetPassword',
                    component: resolve => require(['src/components/login/resetPassword'], resolve)
                },
                {
                    path: 'register',
                    component: resolve => require(['src/components/login/register'], resolve)
                }
            ]
        },
        {
            path: '/investment',
            name: 'investment',
            component: resolve => require(['src/components/investment/mall'], resolve),
            children: [
                {
                    path: 'invesmentDetail',
                    component: InvesmentDetail
                }
            ]
        },
        {
            path: '/consultProduct',
            name: 'consultProduct',
            component: resolve => require(['src/components/investment/consultProduct'], resolve),
        },
        {
            path: '/invermentRecord',
            component: resolve => require(['src/components/investment/invermentRecord'], resolve)
          
        },
        {
            path: '/invesmenImmediate/:id',
            component: resolve => require(['src/components/investment/invesmentImmediate'], resolve)
        },
        // {
        //     path: '/invesmentDetail',
        //     component: resolve => require(['src/components/investment/invesmentDetail'], resolve)
        // },
        {
            path: '/me',
            name: 'me',
            component: resolve => require(['src/components/me/me'], resolve)
        },
        {
            path: '/myInfoCenter',
            component: resolve => require(['src/components/me/myInfoCenter'], resolve),
            children: [{
                    path: 'addTransitionPass',
                    component: resolve => require(['src/components/me/child/addTransitionPass'], resolve)
                },
                {
                    path: 'resetTransitionPass',
                    component: resolve => require(['src/components/me/child/resetTransitionPass'], resolve)

                }
            ]
        },
        {
            path: '/myHistory',
            name: 'myHistory',
            component: resolve => require(['src/components/me/myHistory'], resolve)
        },
        {
            path: '/myOrderInfo',
            name: 'myOrderInfo',
            component: resolve => require(['src/components/me/myOrderInfo'], resolve)
        },
        {
            path: '/myAfterSaleService',
            name: 'myAfterSaleService',
            component: resolve => require(['src/components/me/myAfterSaleService'], resolve)
        },
        {
            path: '/myRefundInfo',
            name: 'myRefundInfo',
            component: resolve => require(['src/components/me/myRefundInfo'], resolve)
        },
        {
            path: '/myAmendPhone',
            name: 'myAmendPhone',
            component: resolve => require(['src/components/me/myAmendPhone'], resolve)
        },
        {
            path: '/myVerifyPhone',
            name: 'myVerifyPhone',
            component: resolve => require(['src/components/me/myVerifyPhone'], resolve)
        },
        {
            path: '/clearAddress',
            name: 'clearAddress',
            component: resolve => require(['src/components/me/clearAddress'], resolve)
        },
        {
            path: '/myRewards',
            component: resolve => require(['src/components/me/myRewards'], resolve),
            children: [{
                    path: 'ableUseRewards',
                    name: 'ableUseRewards',
                    component: resolve => require(['src/components/me/child/ableUseRewards'], resolve)
                },
                {
                    path: 'usedRewards',
                    name: 'usedRewards',
                    component: resolve => require(['src/components/me/child/usedRewards'], resolve)
                },
                {
                    path: 'overtimeRewards',
                    name: 'overtimeRewards',
                    component: resolve => require(['src/components/me/child/overtimeRewards'], resolve)
                },
            ]
        },
        {
            path: '/saleCars',
            name: 'saleCars',
            component: resolve => require(['src/components/cars/saleCars'], resolve),
            children: [{
                path: 'carDetail',
                component: resolve => require(['src/components/cars/carDetail'], resolve)
            }]
        },
        {
            path: '/myBankCards',
            component: resolve => require(['src/components/fortuneCenter/myBankCards'], resolve)
        },
        {
            path: '/addBankCard',
            component: resolve => require(['src/components/fortuneCenter/addBankCard'], resolve)

        },
        {
            path: '/recharge',
            component: resolve => require(['src/components/fortuneCenter/recharge'], resolve),
            children: [{
                path: 'chooseBankCard',
                component: resolve => require(['src/components/fortuneCenter/chooseBankCard'], resolve)
            }]

        },
        {
            path: '/withdrawCash',
            component: resolve => require(['src/components/fortuneCenter/withdrawCash'], resolve),
            children: [{
                path: 'chooseBankCard',
                component: resolve => require(['src/components/fortuneCenter/chooseBankCard'], resolve)
            }]

        },
    ]
})