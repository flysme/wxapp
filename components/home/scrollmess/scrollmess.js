// components/home/scrollmess/scrollmess.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    noticeList:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData:{}
  },
  attached(){
    this.initanimation();
  },
  methods: {
    initanimation(){
      let noticeList = this.data.noticeList;
      this.data.timer = null; //定时器设置
      this.data.noticeList = [...noticeList, noticeList[0]];
      this.setData({
        noticeList: this.data.noticeList
      })
      this.animation();
    },
    animation(){
      let totalcount = this.data.noticeList.length;
      let step = 20; //每次移动距离
      let delay = 2000;
      let basecount = 1; //初始化公告数
      let animation = {};
      setInterval(() => {
        animation =  wx.createAnimation({
          transformOrigin: "50% 50%",
          duration: 1000,
          timingFunction: basecount < totalcount ? "ease" :"step-start",
          delay: 0
        });
        let distance = basecount < totalcount ? - (basecount * step) : 0;
        basecount = basecount < totalcount ?basecount :0;
        animation.top(distance).step()
        this.setData({
            animationData: animation.export(),
        })
        basecount++;
      }, delay);
    }
  }
})
