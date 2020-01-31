const CryptoJS = require('crypto-js');

module.exports = {
  toast,
  toastTitle,
  encryptData,
  decryptData
}


function toast(_this, bodyText, variant = 'secondary', toaster = 'b-toaster-top-right') { 
  _this.$bvToast.toast(bodyText, {
    title: 'Notification',
    toaster: toaster,    
    variant: variant,
  })
}

function toastTitle(_this, title, bodyText, toaster = 'b-toaster-top-right', append = false) {  // toast with title
  _this.$bvToast.toast(bodyText, {
    title: title,
    toaster: toaster,
    solid: true,
    appendToast: append
  })
}

const secret = process.env.VUE_APP_SECRET_PASSPHRASE;

function encryptData(data) {
  // console.log('process.env.VUE_APP_SECRET_PASSPHRASE: ' + process.env.VUE_APP_SECRET_PASSPHRASE);
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), secret).toString();
    } catch (e) {
      console.log(e);
    }
  }

function decryptData(data) {

    try {
      const bytes = CryptoJS.AES.decrypt(data, secret);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }
