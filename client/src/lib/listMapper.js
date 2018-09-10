import accountMapper from './accountMapper';
import blockMapper from './blockMapper';
import bpMapper from './bpMapper';
import txMapper from './txMapper';

const listMapper = (list, type) => {
  if (list.length < 1) return [];
  const newList = [];
  switch (type) {
    case 'acc':
      list.forEach(el => newList.push(accountMapper(el)));
      break;
    case 'block':
      list.forEach(el => newList.push(blockMapper(el)));
      break;
    case 'bp':
      list.forEach(el => newList.push(bpMapper(el)));
      break;
    case 'tx':
      list.forEach(el => newList.push(txMapper(el)));
      break;
    default:
      break;
  }
  return newList;
};

export default listMapper;
