import Vue from 'vue'

Vue.filter('capitalize', function (value) {  
  if (!value) return ''  
  value = value.toString()

  let index = value.indexOf('_');
  if (index>0){
    return value.charAt(0).toUpperCase() + value.substring(1, index) + ' ' + value.charAt(index+1).toUpperCase() + value.substring(index+2)
  }
  
  return value.charAt(0).toUpperCase() + value.slice(1)
})


Vue.filter('currency', function (value, nairaSign = true) {
    
  if (value !== 0 && !value) return ''  
  value = value.toString();
  if(nairaSign) return (new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(value));
  return (new Intl.NumberFormat('en-NG').format(value, { style: 'currency'}));
  
})
  

Vue.filter('date', function (value, form_format = false) {
  if (!value) return ''  
  // value = value.toString()
  
  if (form_format){
    value = new Date(value);
    return new Date(value.getTime() - (value.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
  }
  return new Date(value).toDateString()  
})


Vue.filter('text_truncate', function (value, size = 25 ) {
  if (!value) return ''  
  value = value.toString()
  
  return (value.length > size) ?  value.substring(0, size) + '...' : value;   
})
  

Vue.filter('full_name_phone', function (obj, phone = true) {
  console.log('obj: ' + JSON.stringify(obj));
  if (!obj) return ''    
  if(!phone) return `${obj.firstname} ${obj.lastname}`;
  return `${obj.firstname} ${obj.lastname} - ${(obj.phone) ? obj.phone: obj.accountNo}`;   
})
  
  