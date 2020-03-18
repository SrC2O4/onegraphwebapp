import CryptoJS from 'crypto-js';

export default class MaterialCrypto {
  static encode(content) {
    const contentStr = JSON.stringify(content);
    const key = CryptoJS.enc.Base64.stringify(
      CryptoJS.HmacSHA256(contentStr, 'XJA9PH5rVTJWG^sJZP6UjlE1')
    );

    return new Buffer(contentStr).toString('base64') + '.' + key;
  }

  static decode(code) {
    const dot = code.indexOf('.');
    if (dot !== -1) {
      const content = new Buffer(code.substring(0, dot), 'base64').toString();
      const key = code.substring(dot + 1);
      if (
        CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(content, 'XJA9PH5rVTJWG^sJZP6UjlE1')) ===
        key
      ) {
        return JSON.parse(content);
      } else throw 'signed fail';
    } else throw 'deocde fail';
  }
}
