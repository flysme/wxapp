// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curcolor:'#499bfb',
    precolor:'#FFF',
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
  
  },
  bindline(){
    this.setData({ istoast:true})
  },
  onShareAppMessage: function () {
  
  }
})