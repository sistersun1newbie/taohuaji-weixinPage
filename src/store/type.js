//请求
export const CHANGE_SIZE='CHANGE_SIZE'
export const test='test'
//1 用户地址
export const ADD_ADDRESS='/ejWechat/wechatUserAddress/add'
export const QUERY_ADDRESS='/ejWechat/wechatUserAddress/noPages'
export const UPDATE_ADDRESS='/ejWechat/wechatUserAddress/update'
export const DELETE_ADDRESS='/ejWechat/wechatUserAddress/delete'
export const UPDATE_USERINFO='/ejWechat/wechatUserInfo/update'
export const QUERY_USERINFO='/ejWechat/wechatUserInfo/detail'

//3 发票信息
export const ADD_INVOICE='/ejWechat/userInvoice/add'
export const QUERY_INVOICE='/ejWechat/userInvoice/noPages'
export const UPDATE_INVOICE='/ejWechat/userInvoice/update'
export const DELETE_INVOICE='/ejWechat/userInvoice/delete'

//2 预约地址
export const ADD_DATAINFO='/ejWechat/aggredDateInfo/add'
export const QUERY_DATAINFO='/ejWechat/aggredDateInfo/getByUser'
export const UPDATE_DATAINFO='/ejWechat/aggredDateInfo/update'
export const DELETE_DATAINFO='/ejWechat/aggredDateInfo/delete'

//4 卡券主题 和 
export const QUERY_CARDTHEME='/ejWechat/cardTheme/pages'
//5 卡券商品
export const QUERY_PROINFO='/ejWechat/cardProductInfo/getByCardThemeId'

//6 卡券兑换
export const ADD_CARDTHEME='/ejWechat/cardExchangeMonth/addDetail'
export const ADD_PROINFO='/ejWechat/cardExchangeRecord/add'
export const QUERY_RECORD='/ejWechat/cardEntityInfo/noPage'
export const QUERY_CARDENTITY='/ejWechat/cardExchangeMonth/getRecordAndDetail'

export const QUERY_CARDHISTORY='/ejWechat/cardEntityInfo/Invalid'
export const QUERY_CARDDETAIL='/ejWechat/cardExchangeMonthHis/getRecordAndDetail'

export const DELETE_CARDHISTORY='/ejWechat/cardEntityInfo/delete'

export const QUERY_CARDUSING='/ejWechat/cardEntityInfo/useing'
export const QUERY_CARDCONVER='/ejWechat/cardEntityInfo/convertible'
export const QUERY_CARD_ENTITY_DETAIL='/ejWechat/cardEntityInfo/detail'

export const UPDATE_CARDEXCHANGE='/ejWechat/cardExchangeMonth/update'
///ejWechat/cardEntityInfo/delete


export const UPDATE_CARDBIND='/ejWechat/oldCard/bind'


//7 轮播
export const QUERY_CARDBANNER='/ejWechat/cardBanner/show'
//8 赠送
export const ADD_GIVERECORD='/ejWechat/giveRecord/add'

//9.评论管理 
//9.1用户添加评论
export const ADD_ORDERCOMMENT='/ejWechat/orderComment/add'
//9.2获取评论列表
export const QUERY_ORDERCOMMENT='/ejWechat/orderComment/show'
//10.订单//10.1提交订单

export const ADD_CARDORDER='/ejWechat/cardOrder/add'
//10.2订单支付(备用)
export const v='/ejWechat/cardOrder/pay'
//10.3订单发货10.4订单收货
export const ADD_CARDORDERDELIVERY='/ejWechat/cardOrder/goods'
//
//10.5分页查询订单
export const QUERY_CARDORDER='/ejWechat/cardOrder/getByUserId'
//10.6查询订单详情
export const QUERY_CARDORDERDETAIL='/ejWechat/cardOrder/detail'
//10.7.删除订单
export const DELETE_CARDORDERDETAIL='/ejWechat/cardOrder/delete'
//10.7.删除订单
export const DELETE_CARDORDERUNPAY='/ejWechat/cardOrder/delUnPayCardOrder'



//11. 区划地址查询接口
export const QUERY_CHINAAREA='/ejWechat/chinaArea/getChinaArea'
//12.查询图片服务器地址接口
export const QUERY_IMGPATH='/ejWechat/imgServer/getImgPath'
//13.店铺列表
export const QUERY_STORELIST='/ejWechat/nkStoreInfo/getNkStoreInfoList'


//卡券二次领取（获取卡券签名）：
export const UPDATE_CARDTOPACKAGE='/ejWechat/mall/getCardSignCfg'
//卡券二次领取（获取卡券签名）：
export const UPDATE_CARDTOPACKAGEBYCARDID='/ejWechat/mall/getCardSignByCardId'
//根据卡卷id查询二维码 
export const QUERY_CARDQRCODE='/ejWechat/mall/getCardQr'
//未付款订单 去付款
export const UPDATE_CARDORDERPAY='/ejWechat/cardOrder/pay'



export const WX_SDKSINGCFG='/ejWechat/mall/getSdkSignCfg'
export const GET_CARDSIGNCFG='/ejWechat/mall/getCardSignCfg'

