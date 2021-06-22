<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <recommend-view :recommend="recommend"></recommend-view>
    <feature-view></feature-view>

    <tab-control :titles="['流行', '新款', '精选']" class="tab-control"></tab-control>
    <!-- 暂时放这里占位 -->
    <ul>
      <li>1count</li>
      <li>2count</li>
      <li>3count</li>
      <li>4count</li>
      <li>5count</li>
      <li>6count</li>
      <li>7count</li>
      <li>8count</li>
      <li>9count</li>
      <li>10count</li>
      <li>11count</li>
      <li>12count</li>
      <li>13count</li>
      <li>14count</li>
      <li>15count</li>
      <li>16count</li>
      <li>17count</li>
      <li>18count</li>
      <li>19count</li>
      <li>20count</li>
      <li>21count</li>
      <li>22count</li>
      <li>23count</li>
      <li>24count</li>
      <li>25count</li>
      <li>26count</li>
      <li>27count</li>
      <li>28count</li>
      <li>29count</li>
      <li>30count</li>
      <li>31count</li>
      <li>32count</li>
      <li>33count</li>
      <li>34count</li>
      <li>35count</li>
      <li>36count</li>
      <li>37count</li>
      <li>38count</li>
      <li>39count</li>
      <li>40count</li>
      <li>41count</li>
      <li>42count</li>
      <li>43count</li>
      <li>44count</li>
      <li>45count</li>
      <li>46count</li>
      <li>47count</li>
      <li>48count</li>
      <li>49count</li>
      <li>50count</li>
      <li>51count</li>
      <li>52count</li>
      <li>53count</li>
      <li>54count</li>
      <li>55count</li>
      <li>56count</li>
      <li>57count</li>
      <li>58count</li>
      <li>59count</li>
      <li>60count</li>
      <li>61count</li>
      <li>62count</li>
      <li>63count</li>
      <li>64count</li>
      <li>65count</li>
      <li>66count</li>
      <li>67count</li>
      <li>68count</li>
      <li>69count</li>
      <li>70count</li>
      <li>71count</li>
      <li>72count</li>
      <li>73count</li>
      <li>74count</li>
      <li>75count</li>
      <li>76count</li>
      <li>77count</li>
      <li>78count</li>
      <li>79count</li>
      <li>80count</li>
      <li>81count</li>
      <li>82count</li>
      <li>83count</li>
      <li>84count</li>
      <li>85count</li>
      <li>86count</li>
      <li>87count</li>
      <li>88count</li>
      <li>89count</li>
      <li>90count</li>
      <li>91count</li>
      <li>92count</li>
      <li>93count</li>
      <li>94count</li>
      <li>95count</li>
      <li>96count</li>
      <li>97count</li>
      <li>98count</li>
      <li>99count</li>
      <li>100count</li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from "./homeComps/HomeSwiper";
import RecommendView from "./homeComps/RecommendView";
import FeatureView from "./homeComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";

import { getHomeMultidata } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banner: [],
      recommend: [],
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
  },
  created() {
    //1.请求多个数据
    getHomeMultidata().then((res) => {
      this.banner = res.data.banner.list;
      this.recommend = res.data.recommend.list;
    });
  },
};
</script>

<style>
#home {
  padding-top: 44px;
}
.home-nav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: var(--color-tint);
  color: #fff;
  z-index: 3;
}


.tab-control {
  position: sticky;
  top: 44px;
}
</style>