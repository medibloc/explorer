import PropTypes from 'prop-types';
import React from 'react';

import ContentWrapper from '../ContentWrapper';
import {
  accountMapper,
  blockMapper,
  timeConverter,
  txMapper,
} from '../../lib';

import './TableWithIcon.scss';


const titles = {
  block: ['Block Hash', 'BP', 'Time Stamp'],
  tx: ['Time Stamp', 'Transaction Hash'],
  account: ['Account', 'Balance', 'Percentage', 'Transactions'],
  bp: ['Ranking', 'Account', 'votes'],
};

const TableWithIcon = ({ data, type, totalSupply = undefined }) => {
  let dataList = [];
  const titleList = type ? titles[type] : [];
  if (data) {
    switch (type) {
      case 'account':
        data.forEach(datum => dataList.push(accountMapper(datum, totalSupply)));
        break;
      case 'block':
        data.forEach(datum => dataList.push(blockMapper(datum)));
        break;
      case 'tx':
        data.forEach(datum => dataList.push(txMapper(datum)));
        break;
      case 'bp':
        dataList = data;
        break;
      default:
        break;
    }
  }

  return (
    <div className="blocks">
      {
        dataList.map((datum, i) => {
          const d = datum['Time Stamp'] !== undefined ? Object.assign({}, datum, {
            'Time Stamp': timeConverter(datum['Time Stamp']),
          }) : datum;
          return (
            <ContentWrapper
              type={type}
              data={d}
              titles={titleList}
              key={i} // eslint-disable-line
            />
          );
        })
      }
    </div>
  );
};

TableWithIcon.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['block', 'tx', 'account']).isRequired,
};

export default TableWithIcon;
