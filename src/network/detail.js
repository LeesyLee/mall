import { request } from "./request"

export function getDetailData(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

//请求推荐模块数据
export function getRecommend(){
  return request({
    url: '/recommend'
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

//细节信息
export class DetailInfo {
  constructor(detailInfo){
    // console.log(detailInfo);
    //描述
    this.desc = detailInfo.desc;
    //图片信息
    this.detailImage = detailInfo.detailImage;
  }
}

//商品参数信息
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    // if(info.images !== undefined) this.image = info.images[0];
    // else {this.image = '';}
    this.image = info.images ? info.images[0] : '';
    this.rule = rule;
    //图案/厂名/...其他信息数据
    this.infos = info.set;
    //尺码数据
    this.sizes = rule.tables;
  }
}

//评论
export class CommentInfo {
  constructor(crate,list){
    this.crate = crate;
    this.list = list.length > 0 ? list[0] : [];
    //用户数据
    this.user = list[0].user;
    //评论内容
    this.content = list[0].content;
    //商品属性
    this.style = list[0].style;
    //评论时间
    this.created = list[0].created;
    //评论图片
    this.images = list[0].images;
  }
}

