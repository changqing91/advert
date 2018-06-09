<template>
  <div>
    <el-container>
      <adv-header></adv-header>
      <el-main class="container">
        <div class="description">
          <h2>玩法介绍</h2>
          <p>在使用之前：如果您在桌面Chrome浏览器访问，您需要安装<a href="https://github.com/ChengOrangeJu/WebExtensionWallet" target="_blank">WebExtensionWallet</a>官方钱包插件；如果在移动设备的Chrome访问，您需要安装
            <a href="https://nano.nebulas.io/" target="_blank">Nebulas智能数字钱包</a></p>
          <h3>广告</h3>
          <p>网站首页一共30个广告位，广告位的价值根据位置决定，除了增加广告位中广告主的曝光量，在每个广告主购买广告位的同时，会给上一个广告主一部分NAS奖励。比例分配为：奖励合约：上一个广告主：平台，5：3：2。通过Token的激励以及平台的营销，增加广告位的曝光，使广告主最大程度达到广告曝光的效果。</p>
          <h3>签到</h3>
          <p>每个地址每次可以获取0.001个NAS，在签到资金池充裕后，会持续增加签到奖励数量。</p>
        </div>
      </el-main>
      <adv-footer></adv-footer>
    </el-container>
  </div>
</template>

<script>
  import Header from "@/components/Header";
  import Footer from "@/components/Footer";

  export default {
    name: "Index",
    data() {
      return {
        dialogVisible: false,
        advImg: null,
        currentDate: new Date()
      };
    },

    components: {
      "adv-header": Header,
      "adv-footer": Footer
    },

    methods: {},

    mounted() {
      window.scrollTo(0, 0)
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
  }
  .description {
    margin-bottom: 60px;
    h2 {
      font-size: 40px;
      color: #393742;
      text-align: center;
      line-height: 60px;
      margin-top: 20px;
      background-image: -webkit-linear-gradient(
          -45deg,
          #eb0028 28%,
          #eb0028 34%,
          #000 70%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      transition-delay: 0.2s;
      font-weight: 300;
    }
    h3 {
      font-size: 22px;
      margin-top: 20px;
      text-align: center;
    }
    p {
      font-size: 20px;
      font-weight: 300;
      color: #101920;
      margin-top: 20px;
      text-indent: 2em;
      text-align: left;
      word-break: break-all;
      vertical-align: baseline;
      font-family: MYingHeiW4;
      -webkit-font-smoothing: antialiased;
      a {
        color: #4560e6;
      }
    }
  }
</style>
