let { setstorage, getstorage } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isTip:true,
    waitTime: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('xxxxxx')
      this.init()
  },
  onShow(){
    this.waitTime(); //等待时间计算
  },
  init(){
    this.dealyClose(); //延迟提示自动关闭
    this.setData({ waitTime: getstorage('waittime') || 0}); //新赋值
    !getstorage('waittime')&&setstorage('afterTime', Date.now()); //存储第一次排号时间
  },
  dealyClose(){
    let dealy = 10000; //关闭时间
    this.timer = setTimeout(() => {
      this.setData({ isTip: false });
    }, dealy);
  },
  // 计算等待时间
  waitTime(){
    let afterTime = getstorage('afterTime');
    console.log(afterTime,'afterTime')
    let dealy = 1000 * 60; //一分钟计算一次当前时间
    let m = 60;
    let _this = this;
    function isTime(){
      console.log('dealy', dealy)
        let nowTime = Date.now();
        console.log('nowTime', nowTime, 'afterTime', afterTime)
        setTimeout(()=>{
          let second = Math.ceil( ( (nowTime - afterTime ) /1000 ) );
          let waitTime = Math.ceil((second / m) ); //当前最新时间减去排队下号时间
          console.log('waitTime', waitTime)
          setstorage('waittime', waitTime); //存下用于首次进入
          _this.setData({ waitTime: waitTime})
          isTime() //一分钟进行一次重新等待时间
        }, dealy)
    }
    afterTime && isTime();
  },
  // 刷新当前状态
  refrshStatus(){

  },
  // 重新取号
  regetNumber(){

  },
  // 取消排队
  cancelLine(){

  },
  onHide: function () {
    clearTimeout(this.timer);
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  onShareAppMessage: function () {
  
  }
})