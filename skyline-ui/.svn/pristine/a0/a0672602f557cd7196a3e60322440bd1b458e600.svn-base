
let fun={
   isBlank : val => {
    if((val==null) || (val =='') || (val ==undefined)){
      return true;
    }else{
      return false;
    }
  },
  isFloat : val=>{
    var regu = /^\d+(\.\d+)?$/;
    if (regu.test(val)) {
      return true;
    } else {
      return false;
    }
  },
  isPayPwd:val=>{
    if (val.length < 6 || val.length > 12) {
      return false;
    }
    var reg = new RegExp(/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/);
    if (reg.test(val)) {
      return true;
    }else{
      return false;
    }
  },
  /**
   ** 加法函数，用来得到精确的加法结果
   ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
   ** 调用：accAdd(arg1,arg2)
   ** 返回值：arg1加上arg2的精确结果
   **/
  accAdd:(arg1, arg2)=>{
      let r1, r2, m, c;
      try {
        r1 = arg1.split(".")[1].length;
      }
      catch (e) {
        r1 = 0;
        arg1 = 0;
      }
      try {
        r2 = arg2.split(".")[1].length;
      }
      catch (e) {
        r2 = 0;
        arg2 = 0;
      }
      c = Math.abs(r1 - r2);
      m = Math.pow(10, Math.max(r1, r2));
      if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
          arg1 = Number(arg1.replace(".", ""));
          arg2 = Number(arg2.replace(".", "")) * cm;
        } else {
          arg1 = Number(arg1.replace(".", "")) * cm;
          arg2 = Number(arg2.replace(".", ""));
        }
      } else {
        arg1 = Number(arg1.replace(".", ""));
        arg2 = Number(arg2.replace(".", ""));
      }
      return (arg1 + arg2) / m;
  },
  /**
   ** 减法函数，用来得到精确的减法结果
   ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
   ** 调用：accSub(arg1,arg2)
   ** 返回值：arg1加上arg2的精确结果
   **/
   accSub:(arg1, arg2)=> {
      let r1, r2, m, n;
      try {
        r1 = arg1.split(".")[1].length;
      }
      catch (e) {
        r1 = 0;
      }
      try {
        r2 = arg2.split(".")[1].length;
      }
      catch (e) {
        r2 = 0;
      }
      m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
      n = (r1 >= r2) ? r1 : r2;
      return ((arg1 * m - arg2 * m) / m).toFixed(n);
   },
  /**
   ** 乘法函数，用来得到精确的乘法结果
   ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
   ** 调用：accMul(arg1,arg2)
   ** 返回值：arg1乘以 arg2的精确结果
   **/
   accMul:(arg1, arg2)=> {
        var m = 0, s1 = arg1, s2 = arg2;
        try {
          m += s1.split(".")[1].length;
        } catch (e) {
        }
        try {
          m += s2.split(".")[1].length;
        } catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
   },
  /**
   ** 除法函数，用来得到精确的除法结果
   ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
   ** 调用：accDiv(arg1,arg2)
   ** 返回值：arg1除以arg2的精确结果
   **/
   accDiv:(arg1, arg2)=> {
    let t1 = 0, t2 = 0, r1, r2;
    try {
      t1 = arg1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
      t2 = arg2.split(".")[1].length;
    }
    catch (e) {
    }
    r1 = Number(arg1.replace(".", ""));
    r2 = Number(arg2.replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);

  },

  /**
   * 校验密码 （至少六位数 包含数字和字母）
   * @param val
   * @returns {boolean}
   */
  checkPwd:val=>{
    if(val==null||val==''){
      return false;
    }
    if (val.length < 6 || val.length > 12) {
      return false;
    }
    var reg = new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/);
    if (reg.test(val)) {
      return true;
    }else{
      return false;
    }
  },

  /**
   * 校验手机号码
   * @param val
   * @returns {boolean}
   */
    checkPhone:val=>{
    if(val==null||val==''){
      return false;
    }
      var reg = new RegExp(/^1(3[0-9]|5[189]|8[6789])[0-9]{8}$/);
      if (reg.test(val)) {
        return true;
      }else{
        return false;
      }
    },
  /**
   * 校验邮箱地址
   * @param val
   * @returns {boolean}
   */
    checkEmail:val=>{
    if(val==null||val==''){
      return false;
    }
      var reg = new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/);
      if (reg.test(val)) {
        return true;
      }else{
        return false;
      }
    },
  /**
   * 校验身份证
   * @param val
   * @returns {boolean}
   */
    checkIdCard:val=>{
      if(val==null||val==''){
        return false;
      }
      var reg18 = new RegExp(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/);
      var reg15 = new RegExp(/^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$/);

      if (reg18.test(val)||reg15.test(val)) {
        return true;
      }else{
        return false;
      }
    },




}




export default fun;
