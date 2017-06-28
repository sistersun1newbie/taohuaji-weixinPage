import exchange from 'components/exchange'
import mine from 'components/mine'
import mainpage from 'components/mainpage'
import mainchildalive from 'components/mainchildalive'
import mbuychildalive from 'components/mbuychildalive'
import buy from 'components/buy'
import buycomment from 'components/buycomment'
import buydetail from 'components/buydetail'



function layzLoading(path) {
    return () =>
        import (`components/${path}.vue`)
}
export default [{
        path: '/',
        component: mainchildalive,
        meta: {
            //			requiresAuth: true,
            //			title: '首页'
        },
        children: [{
                path: '/exchange',
                name: 'exchange', 
                component: exchange,
                meta: {
                    title: '兑换列表',
                    showTab: true,
                    operation: {
                        operationflag: true,
                        operationText: '实体卡关联',
                        operaprop: '',

                    },
                    index: 2,
                    backicon: false,
                    //			Auth:['test','imgpath']
                }
            },
            {
                path: '/mine',
                name: 'mine',
                component: mine,
                meta: {
                    showTab: true,
                    showTitle: false,
                    index: 3
                }
            },
            {
                path: '/', 
                name: 'mainpage',
                component: mainpage,
                meta: {
                    showTab: true,
                    showTitle: false,
                    index: 1
                }
            }
        ]
    },
    {
        path: '/buy',
        component: mbuychildalive,

        children: [{
                path: '',
                name: 'buy',
                component: buy,
                meta: {
                    title: '购买',
                    showtabitem: true,
                    //			Auth:['productid']
                },
            },
            {
                path: 'buydetail',
                name: 'buydetail',
                component: buydetail,
                meta: {
                    title: '卡片详情',
                    showtabitem: true,
                    //			Auth:['productid'],
                },
            },
            {
                path: 'buycomment',
                name: 'buycomment',
                component: buycomment,
                meta: {
                    title: '卡片详情',
                    showtabitem: true,
                    //			Auth: ['productpid'],
                },
            }
        ]

    },

    {
        path: '/qrcode',
        name: 'qrcode',
        component: layzLoading('qrcode'),
        meta: {
            title: '二维码'
        },
    },
    {
        path: '/history',
        name: 'history',
        component: layzLoading('history'),
        meta: {
            title: '我的订单'
        },
    },
    {
        path: '/paySuccess',
        name: 'paySuccess',
        component: layzLoading('paySuccess'),
        meta: {
            title: '支付成功'
        },
    },
    {
        path: '/presenter',
        name: 'presenter',
        component: layzLoading('presenter'),
        meta: {
            title: '赠送'
        },
    },
    {
        path: '/neighborStore',
        name: 'neighborStore',
        component: layzLoading('neighborStore'),
        meta: {
            title: '附近的店'
        },
    },
    {
        path: '/storeDetail',
        name: 'storeDetail',
        component: layzLoading('storeDetail'),
        meta: {
            title: '店面详情'
        },
    },

    {
        path: '/description',
        name: 'description',
        component: layzLoading('description'),
        meta: {
            title: '活动须知'
        },
    },
    {
        //:orderId/:cardProductId
        path: '/historyDetail/',
        name: 'historyDetail',
        component: layzLoading('historyDetail'),
        meta: {
            title: '详情',
            Auth: ['dingdanobj'],
        },
    },
    {
        path: '/managerAddress',
        name: 'managerAddress',
        component: layzLoading('managerAddress'),
        meta: {
            title: '收货地址'
        },
    },
    {
        path: '/addAddress',
        name: 'addAddress',
        component: layzLoading('addAddress'),
        meta: {
            title: '新增收货地址'
        },
    },
    {
        path: '/invoice',
        name: 'invoice',
        component: layzLoading('invoice'),
        meta: {
            title: '发票'
        },
    },
    {
        path: '/mineinfo',
        name: 'mineinfo',
        component: layzLoading('mineinfo'),
        meta: {
            title: '个人信息',
        },
    },
    {
        path: '/mineinfoupdate',
        name: 'mineinfoupdate',
        component: layzLoading('mineinfoupdate'),
        meta: {
            title: '个人修改',
        },
    },

    {
        path: '/mycard/:id',
        name: 'mycard',
        component: layzLoading('mycard'),
        meta: {
            title: '历史列表'
        },
    },
    {
        path: '/cardDetail',
        name: 'cardDetail',
        component: layzLoading('cardDetail'),
        meta: {
            title: '卡片详情'
        },
    },

    {
        //:orderId/:cardProductId
        path: '/evaluate/',
        name: 'evaluate',
        component: layzLoading('evaluate'),
        meta: {
            title: '评论',
            Auth: ['dingdanobj']
        },
    },
    {
        path: '/exchange1',
        name: 'exchange1',
        component: layzLoading('exchange1'),
        meta: {
            title: '兑换',
        },
    },
    {
        path: '/exchange2',
        name: 'exchange2',
        component: layzLoading('exchange2'),
        meta: {
            title: '公司邮寄',
            //			Auth:['MonthId'],
        },
    },
    {
        path: '/exchange3',
        name: 'exchange3',
        component: layzLoading('exchange3'),
        meta: {
            title: '送货单'
        },
    },
    { //:cardid
        path: '/exchange4/',
        name: 'exchange4',
        component: layzLoading('exchange4'),
        meta: {
            title: '卡片详情',
            operation: {
                operationText: '操作',
                operaprop: 'showac2',
            },
            //			Auth:['card']
        },
    },
    {
        path: '/exchange5',
        name: 'exchange5',
        component: layzLoading('exchange5'),
        meta: {
            title: '兑换记录'
        },
    },
    {
        path: '/managerInvoice',
        name: 'managerInvoice',
        component: layzLoading('managerInvoice'),
        meta: {
            title: '发票管理'
        },
    },
    {
        path: '/queryorderdata',
        name: 'queryorderdata',
        component: layzLoading('queryorderdata'),
        meta: {
            title: '预约日期'
        },
    },
    {
        path: '/settingdata',
        name: 'settingdata',
        component: layzLoading('settingdata'),
        meta: {
            title: '预约发货'
        },
    },
    {
        path: '/mineinfochoose',
        name: 'mineinfochoose',
        component: layzLoading('mineinfochoose'),
        meta: {
            title: '我的信息'
        },
    },


]