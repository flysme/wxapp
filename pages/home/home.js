let { getUserInfo }  = getApp();
let PromiseService = require("../../utils/promise");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    curcolor:'#499bfb',
    precolor:'#FFF',
    animationData:'',
    title:'',
    noticeList:[
      { title: "最新", content: '新推出麻辣小龙虾~~~~' },
      { title: "Hot", content: '我是一条测试公告1' },
      { title: "推荐", content: '我是一条测试公告2' }
    ],
    indexpicList: ['https://fuss10.elemecdn.com/9/3d/4f5548cbad819fbbb26ea2f952381png.png','https://fuss10.elemecdn.com/9/3d/4f5548cbad819fbbb26ea2f952381png.png']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.authorize({
      scope: 'scope.userInfo'
    })
  },
  bindline(e){
    console.log(e,'xxxxx')
    getUserInfo(res=>{console.log(res)});
    this.setData({ istoast:true})
  },
  setnum(e){
    let demand = e.detail;
    console.log(demand);
    this.setData({ istoast: false })
    this.animation(-100);
  },
  animation(range) {
    let animation = wx.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1000,
      timingFunction: "ease",
      delay: 4000
    })
    animation.translateY(`${range}vh`).step({ duration:2000})
    this.setData({
      animationData: animation.export()
    })
    wx.setNavigationBarTitle({'title':'排队中'})
  },
  onShareAppMessage: function () {
  
  },
  onPullDownRefresh(){
    console.log('xxxx')
    // wx.stopPullDownRefresh()
  }
})