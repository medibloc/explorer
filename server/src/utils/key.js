import bech32 from 'bech32';
import crypto from 'crypto';


const pubKeyPrefix = {
  ed25519: '1624DE64',
  secp256k1: 'EB5AE987',
};
const lengthPrefix = {
  ed25519: '20',
  secp256k1: '21',
};

const basePub2hexPub = (base64Pub, type = 'secp256k1') => {
  const rawHexPub = Buffer.from(base64Pub, 'base64').toString('hex');
  const hexPub = `${pubKeyPrefix[type]}${lengthPrefix[type]}${rawHexPub}`;
  return hexPub;
};

const bechPub2hexPub = (bech32Pub) => {
  const { words } = bech32.decode(bech32Pub);
  const arrConvertedTo8bit = bech32.fromWords(words);
  const buf = Buffer.from(arrConvertedTo8bit);
  return buf.toString('hex');
};

const hexPub2bechPub = (hexPub, hrp) => {
  const bufPub = Buffer.from(hexPub, 'hex');
  const words = bech32.toWords(bufPub);
  const bech32Pub = bech32.encode(hrp, words);
  return bech32Pub;
};

const hexPub2hexAddr = (hexPub) => {
  let rawHexPub = null;

  // CASE 1 : hexPub does include prefix
  if (hexPub.length === 74) rawHexPub = hexPub.slice(74 - 64);
  // CASE 2 : hexPub does not include prefix
  else if (hexPub.length === 64) rawHexPub = hexPub;
  else throw new Error('Invalid public key hex');

  const hexBuf = Buffer.from(rawHexPub, 'hex');
  const hexAddr = crypto.createHash('sha256').update(hexBuf).digest('hex');
  return hexAddr.toUpperCase().slice(0, 20 * 2); // 20 byte address hex
};

const bechPub2hexAddr = (bech32Pub) => {
  const hexPub = bechPub2hexPub(bech32Pub);
  const hexAddr = hexPub2hexAddr(hexPub);
  return hexAddr;
};

export {
  basePub2hexPub,
  bechPub2hexPub,
  hexPub2bechPub,
  hexPub2hexAddr,
  bechPub2hexAddr,
};
