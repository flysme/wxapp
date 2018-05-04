// components/home/choosenum/choosenum.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    istoast:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    mealsList:[
      { id: 1, num:1 },
      { id: 1, num: 2 },
      { id: 2, num: 3 },
      { id: 3, num: 4 },
      { id: 4, num: 5 },
      { id: 5, num: 6 },
      { id: 6, num: 7 },
      { id: 7, num: 8 },
      { id: 7, num: 9 },
      { id: 7, num: 10 },
      { id: 7, num: 11 },
      { id: 7, num: 12 },
      { id: 7, num: 13 },
      { id: 7, num: 14 }
    ],
    tabledemand:[
      { id: 1, room: '小桌', instruction: '1 - 2 人可选', range: { maxnumber: 2, minnumber: 1 }, ischoose: false, serial:'s' },
      { id: 2, room: '中桌', instruction: '3 - 5人可选', range: { maxnumber: 5, minnumber: 3 }, ischoose: false, serial: 'm'},
      { id: 3, room: '大桌', instruction: '6 - 9人可选', range: { maxnumber: 9, minnumber: 6 }, ischoose: false, serial: 'l'},
      { id: 4, room: '超大桌', instruction: '10 - 14人可选', range: { maxnumber: 14, minnumber: 10 }, ischoose: false,serial: 'h'},
    ],
    isnum:-1, //就餐人数选择状态值
    istable:-1, //位置要求选择状态值
    customeremark:{}, //用餐餐桌类型
    disabled:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 选择用餐人数
    bindnum(e){
      let { index ,num} = e.currentTarget.dataset;
      this.data.customeremark.num = num;  //就餐人数
      this.setData({ isnum: index});
      this.utilsTabledemand(num); //位置要求联动处理
      this.isbtn();
    },
    // 选择位置
    bindtable(e){
      let { index, table, ischoose } = e.currentTarget.dataset;
      if (!ischoose)return;
      this.data.customeremark.table = table;  //位置要求
      this.data.customeremark.serial = this.data.tabledemand[index].serial;  //编号开头
      this.setData({ istable: index });
      this.isbtn();
    },
    // 处理位置状态
    utilsTabledemand(num){
      let tabledemand = this.data.tabledemand;
      let istable = this.data.istable;
      let newtabledemandList = tabledemand && tabledemand.map((tableItem,currentIndex)=>{
            let min = tableItem.range.minnumber, max = tableItem.range.maxnumber;
            tableItem.ischoose = false;
            if (num <= max && num >= min)tableItem.ischoose = true;
            if (currentIndex == istable && !tableItem.ischoose){
              this.setData({ istable: -1 })
            }
            return tableItem;
      })
      this.setData({ tabledemand: newtabledemandList})
    },
    // 提交排队
    submit(){
      console.log(this.data.customeremark);
      let hasCustomer = Object.keys(this.data.customeremark).length>=2;
      if (!hasCustomer)return;
      this.triggerEvent('setnum', this.data.customeremark);
      this.setData({ istoast: false, isnum: -1, istable: -1, customeremark: {} })
      this.utilsTabledemand();
      this.isbtn();
    },
    // 取消选择排队
    cancel(){
      this.setData({ istoast: false, isnum: -1, istable: -1, customeremark:{}})
      this.utilsTabledemand();
      this.isbtn();
    },
    // 判断提交是否可用
    isbtn() {
      let customeremark = this.data.customeremark;
      let isnum = this.data.isnum, istable = this.data.istable;
      let isEmpty = Object.values(customeremark).length >= 2 && isnum > -1 && istable > -1;
      this.setData({ disabled: isEmpty ? false : true })
    }
  }
})
