let blank = val => {
    if((val==null) || (val =='') || (val ==undefined)){
      return '--';
    }else{
      return val;
    }
}
let blankNumber = val => {
  if((val==null) || (val =='') || (val ==undefined)){
    return 0;
  }else{
    return val;
  }
}
let dateFormat=val=>{

  if((val==null) || (val =='') || (val ==undefined)||( val < 0 )) {
    return '0分0秒';
  }else{
    let h=  Math.floor(val/(60*60));
    let m = Math.floor(val%(60*60)/60);
    let s = val%(60*60)%60;
    if(h>0) {
      return h + "小时" + m + '分' + s + '秒';
    }else{
      return m + '分' + s + '秒';
    }
  }
}
let fixed8=val=>{
   return val.toFixed(8);
}
let fixed4=val=>{
  return val.toFixed(4);
}
let fixed2=val=>{
  return val.toFixed(2);
}
let subDate=val=>{
  if((val==null) || (val =='') || (val ==undefined)) {
    return '--';
  }
  console.log(val.substring(val.indexOf(' ')+1));
  return val.substring(val.indexOf(' ')+1);
}

export { blank,blankNumber,dateFormat,fixed8,fixed4,fixed2,subDate}
