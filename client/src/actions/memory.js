import CryptoJS from 'crypto-js';

function encodeKey(key) {
  return CryptoJS.enc.Base64.stringify(CryptoJS.HmacMD5(key, 'ahGxUKF4Mc$kfRyiBm!5JIboV*l6@Yd8'));
}

function encode(content) {
  const contentStr = JSON.stringify(content);
  const key = CryptoJS.enc.Base64.stringify(
    CryptoJS.HmacSHA256(contentStr, '2d3i4$@LcnqB#Dw6NMX%ThZpVOmG9Q5R')
  );

  return new Buffer(contentStr).toString('base64') + '.' + key;
}

function decode(code) {
  const dot = code.indexOf('.');
  if (dot !== -1) {
    const content = new Buffer(code.substring(0, dot), 'base64').toString(); 
    const key = code.substring(dot + 1);
    if (
      CryptoJS.enc.Base64.stringify(
        CryptoJS.HmacSHA256(content, '2d3i4$@LcnqB#Dw6NMX%ThZpVOmG9Q5R')
      ) === key
    ) {
      return JSON.parse(content);
    } else return undefined;
  } else return undefined;
}

function setItem(key, value) {
  let config = window.localStorage.getItem(encodeKey('config'));
  if (config) {
    let buf = decode(config);
    buf[encodeKey(key)] = value;
    window.localStorage.setItem(encodeKey('config'), encode(buf));
  } else {
    let buf = {};
    buf[encodeKey(key)] = value;
    window.localStorage.setItem(encodeKey('config'), encode(buf));
  }
}
function getItem(key) {
  let config = window.localStorage.getItem(encodeKey('config'));
  if (config) {
    return decode(config)[encodeKey(key)];
  }
}
function removeItem(key) {
  let config = window.localStorage.getItem(encodeKey('config'));
  if (config) {
    let buf = decode(config);
    delete buf[encodeKey(key)];

    if (JSON.stringify(buf) !== '{}'){
      window.localStorage.setItem(encodeKey('config'), JSON.stringify(buf));
    }
    else {
      window.localStorage.removeItem(encodeKey('config'));
    }
  }
}

export default {
  setItem,
  getItem,
  removeItem,
};
