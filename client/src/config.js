export const NODE_ENDPOINT = '/api/v1';
// export const NODE_ENDPOINT = 'http://localhost:3000/api/v1';

// COINMARKETCAP API
export const COINMARKETCAP_MED_PRICE = 'https://api.coinmarketcap.com/v2/ticker/2303/';
export const COINMARKETCAP_MEDX_PRICE = 'https://api.coinmarketcap.com/v2/ticker/2845/';


// SNS
export const sns = ['telegram', 'twitter', 'fb', 'medium', 'brunch', 'medi'];
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

export const privacyPolicyLink = {
  en: 'https://docs.medibloc.org/PrivacyPolicy_ENG.pdf',
  ko: 'https://docs.medibloc.org/PrivacyPolicy_KR.pdf',
};

export const blindAddress = '000000000000000000000000000000000000000000000000000000000000000000';

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

export const accountListConfig = {
  titles: ['Account', 'Balance', 'Percentage', 'Transactions'],
  linkTo: ['account/account'],
  spaces: [8, 2, 2, 2],
};

export const blockListConfig = {
  titles: ['Block Height', 'Time Stamp', 'Block Hash', 'No.Tx', 'BP'],
  linkTo: ['block/height', 'block/hash', 'account/bp'],
  centerList: ['Block Height', 'No.Tx'],
  spaces: [2, 4, 9, 2, 3],
};

export const bpListConfig = {
  titles: ['Ranking', 'Account', 'votes'],
  linkTo: ['account/account'],
  centerList: ['Ranking'],
  rightList: ['votes'],
  spaces: [10, 65, 10],
};

export const detailWrapperConfig = {
  titles: {
    block: ['Block Height', 'Time Stamp', 'Block Hash', 'Prev Hash', 'Amount', 'No.Tx', 'BP'],
    tx: ['Transaction Hash', 'Status', 'Time Stamp', 'Type', 'From', 'To', 'Amount', 'Nonce', 'Message'],
    account: ['Account', 'Balance', 'Staking', 'Transactions'],
  },
  linkTo: {
    block: ['block/Prev Hash', 'account/BP'],
    tx: ['account/From', 'account/To'],
    account: [],
  },
};

export const navbarPages = ['Block', 'Transaction', 'Account', 'BP'];


export const txTypes = {
  ADD_CERTIFICATION: 'add_certification',
  BECOME_CANDIDATE: 'become_candidate',
  DATA_UPLOAD: 'add_record',
  QUIT_CANDIDATE: 'quit_candidacy',
  REVOKE_CERTIFICATION: 'revoke_certification',
  VALUE_TRANSFER: 'transfer',
  VEST: 'vest',
  VOTE: 'vote',
  WITHDRAW_VESTING: 'withdraw_vesting',
};
