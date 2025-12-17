import CryptoConvert from 'crypto-convert';

let instance = null;
let readyPromise = null;

export const getCryptoConvert = () => {
  if (!instance) {
    instance = new CryptoConvert();
    readyPromise = instance.ready();
  }
  return instance;
};

export const waitForCryptoConvert = async () => {
  if (!readyPromise) {
    getCryptoConvert();
  }
  return readyPromise;
};
