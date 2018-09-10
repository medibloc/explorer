export const NODE_ENDPOINT = '/api/v1';

// COINMARKETCAP API
export const COINMARKETCAP_MED_PRICE = 'https://api.coinmarketcap.com/v2/ticker/2303/';
export const COINMARKETCAP_MEDX_PRICE = 'https://api.coinmarketcap.com/v2/ticker/2845/';

// SNS LINK
export const snsLink = {
  telegram_en: 'https://t.me/medibloc',
  telegram_ko: 'https://t.me/mediblockoreachat',
  telegram_zh: 'https://t.me/medibloc_china',
  telegram_ja: 'https://t.me/mediblocjapan',
  twitter: 'https://twitter.com/_MediBloc',
  fb: 'https://www.facebook.com/medibloc/',
  medium: 'https://medium.com/@medibloc',
  brunch: 'https://brunch.co.kr/@medibloc/',
  medi: 'https://medibloc.org/',
};


// INTERNAL CONFIG
export const contentsInPage = 20;
export const bpsInPage = 30;
export const subscribeMaxResponse = 4;

// STYLING CONFIG
export const navigationDisplay = 5;

// LANGUAGE
export const countryList = ['ko', 'en', 'ja', 'zh'];
export const countryName = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  zh: '中文',
};

// SEARCH
export const maxResult = 15;

// SPACE_LIST (component_page)
export const txSpaceList = {
  account: [2, 1, 2, 2, 1],
  block: [28, 28, 28, 16],
  txs: [20, 15, 20, 20, 15],
};

export const txTitleList = {
  account: ['Transaction Hash', 'Time Stamp', 'From', 'To', 'Amount'],
  block: ['Transaction Hash', 'From', 'To', 'Amount'],
  txs: ['Transaction Hash', 'Time Stamp', 'From', 'To', 'Amount'],
};
