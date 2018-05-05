App({
  common:{
    guid:'xxxxxx',
    code:null //wx-code
  },
  API:"http://www.sbhxr.cn/index.php/admin",
  onLaunch: function () {
    
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  setstorage(key,value){
    wx.setStorageSync(key, value)
  },
  getstorage(key){
   return wx.getStorageSync(key)
  },
  clearstorage(key) {
    wx.removeStorageSync(key)
  },
  globalData:{
    userInfo:null
  }
})