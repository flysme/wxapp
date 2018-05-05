let request = require("./request");
var Promise = require('./lib/es6-promise');
// url
const url = {
  getPosterList:'/manager/wx_login',
  adduser: '/manager/adduser'
};  

// ajax
const PromiseList = {
  /**
   *获取首页宣传海报 
   */
  getPosterList(){
    return new Promise((resolve,reject)=>{
      request({
        url: url.getPosterList,
        _success(res) { resolve('xxxxxxx') },
        _fail(res) { }
      })
    })
  },
  /**
   *用户登录 
   */
  userLogin(){
    return new Promise((resolve, reject) => {
      request({
        url: url.adduser,
        _success(res) { resolve('xxxxxxx') },
        _fail(res) { }
      })
    })
  }
}
module.exports = PromiseList;


