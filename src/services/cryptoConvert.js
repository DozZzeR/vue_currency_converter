import CryptoConvert from 'crypto-convert';

let instance = null;
let readyPromise = null;

export function getCryptoConvert() {
  if (!instance) {
    instance = new CryptoConvert();
    readyPromise = instance.ready();
  }
  return instance;
}

export async function waitForCryptoConvert() {
  if (!readyPromise) {
    getCryptoConvert();
  }
  return readyPromise;
}
