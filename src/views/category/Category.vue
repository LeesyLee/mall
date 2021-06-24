<template>
  <div class="wrapper">
    <!-- <button @click="btnClick">点击</button> -->
    <div>
      <ul>
        <li>1我是最胖的</li>
        <li>2我是最胖的</li>
        <li>3我是最胖的</li>
        <li>4我是最胖的</li>
        <li>5我是最胖的</li>
        <li>6我是最胖的</li>
        <li>7我是最胖的</li>
        <li>8我是最胖的</li>
        <li>9我是最胖的</li>
        <li>10我是最胖的</li>
        <li>11我是最胖的</li>
        <li>12我是最胖的</li>
        <li>13我是最胖的</li>
        <li>14我是最胖的</li>
        <li>15我是最胖的</li>
        <li>16我是最胖的</li>
        <li>17我是最胖的</li>
        <li>18我是最胖的</li>
        <li>19我是最胖的</li>
        <li>20我是最胖的</li>
        <li>21我是最胖的</li>
        <li>22我是最胖的</li>
        <li>23我是最胖的</li>
        <li>24我是最胖的</li>
        <li>25我是最胖的</li>
        <li>26我是最胖的</li>
        <li>27我是最胖的</li>
        <li>28我是最胖的</li>
        <li>29我是最胖的</li>
        <li>30我是最胖的</li>
        <li>31我是最胖的</li>
        <li>32我是最胖的</li>
        <li>33我是最胖的</li>
        <li>34我是最胖的</li>
        <li>35我是最胖的</li>
        <li>36我是最胖的</li>
        <li>37我是最胖的</li>
        <li>38我是最胖的</li>
        <li>39我是最胖的</li>
        <li>40我是最胖的</li>
        <li>41我是最胖的</li>
        <li>42我是最胖的</li>
        <li>43我是最胖的</li>
        <li>44我是最胖的</li>
        <li>45我是最胖的</li>
        <li>46我是最胖的</li>
        <li>47我是最胖的</li>
        <li>48我是最胖的</li>
        <li>49我是最胖的</li>
        <li>50我是最胖的</li>
        <li>51我是最胖的</li>
        <li>52我是最胖的</li>
        <li>53我是最胖的</li>
        <li>54我是最胖的</li>
        <li>55我是最胖的</li>
        <li>56我是最胖的</li>
        <li>57我是最胖的</li>
        <li>58我是最胖的</li>
        <li>59我是最胖的</li>
        <li>60我是最胖的</li>
        <li>61我是最胖的</li>
        <li>62我是最胖的</li>
        <li>63我是最胖的</li>
        <li>64我是最胖的</li>
        <li>65我是最胖的</li>
        <li>66我是最胖的</li>
        <li>67我是最胖的</li>
        <li>68我是最胖的</li>
      </ul>
    </div>

  </div>
</template>

<script>

  import BTscroll from 'better-scroll'


  export default {
    name: 'Category',
    data() {
      return {
        bscroll: null
      }
    },
    mounted() {
      this.bscroll = new BTscroll(document.querySelector(".wrapper"), {
        probeType: 3,
        pullUpLoad: true
      });
      this.bscroll.on('scroll', position => {
        // console.log(position);
        
      });
      this.bscroll.on('pullingUp',() => {
        console.log('上拉加载更多');
      })
    },
    methods: {
      btnClick() {
        console.log(1);
      },

    }
  }


</script>

<style scoped>
  .wrapper {
    background-color: pink;
    height: 180px;

    overflow: hidden;
    /* overflow-y: scroll; */
  }
</style>