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
          <p>网站首页一共30个广告位，广告位的价值根据其位置和大小决定。由于数量有上限，每个广告位都有其绝版价值，广告位会随着屏幕自适应其大小比例，资源一定的情况下，每一块位置都弥足珍贵，随着网站的推广，广告位的价值会不断提升。并支持移动端钱包调用购买，降低参与门槛。</p>
          <p>玩家可以通过NAS购买广告位的所属权，购买的价格必须大于等于当前价格的120%，购买成功后，合约自动向上一个拥有者发送本次购买金额的110%，剩余10%留在合约中，为用户提供签到奖励。通过这一机制，每一个广告位的拥有者会增加其广告的曝光量，与此同时，还会至少会获得10%的收益率，提高的玩家参与的动力。另外，10%的收益分给每个未参与购买，但提供注意力的用户们，为广告位的曝光提供了更大的活性，以此形成利益闭环，多方共赢。</p>
          <h3>签到</h3>
          <p>当前每个地址每次可以获取0.001个NAS，在签到资金池充裕后，会持续增加签到奖励数量。</p>
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
