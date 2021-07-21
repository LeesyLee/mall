import { request } from "./request"

export function getDetailData(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}


//利用类 + 构造函数进行数据整合
export class GoodsBaseInfo {
  constructor(itemInfo, shopInfo, columns) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    //折扣背景颜色
    this.discountBgColor = itemInfo.discountBgColor;
    this.columns = columns;

    this.services = shopInfo.services;

    this.realPrice = itemInfo.lowNowPrice;
  }
}

//店铺信息类
export class ShopInfo {
  constructor(shopInfo){
    //店铺图片
    this.logo = shopInfo.shopLogo;
    //店铺名称
    this.name = shopInfo.name;
    // 销量
    this.sells = shopInfo.cSells;
    // 宝贝数量
    this.goodscount = shopInfo.cFans;
    // 描述相符
    // 价格合理
    // 质量满意
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
    
  }
}