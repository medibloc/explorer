import PropTypes from 'prop-types';
import React from 'react';

import ContentWrapper from '../ContentWrapper';
import {
  accountMapper,
  blockMapper,
  timeConverter,
  txMapper,
} from '../../lib';
import { tableWithIconConfig } from '../../config';

import './TableWithIcon.scss';


const mappedData = ({ data, type, totalSupply }) => {
  if (data) {
    switch (type) {
      case 'account':
        return data.map(datum => accountMapper(datum, totalSupply));
      case 'block':
        return data.map(datum => blockMapper(datum));
      case 'tx':
        return data.map(datum => txMapper(datum));
      case 'bp':
        return data;
      default:
        return [];
    }
  }
  return [];
};

const TableWithIcon = ({ data, type, totalSupply }) => {
  const titleList = type ? tableWithIconConfig.titles[type] : [];
  const dataList = mappedData({ data, type, totalSupply });

  return (
    <div className="tableWithIcon">
      {
        dataList.map((datum, i) => {
          const d = datum['Time Stamp']
            ? { ...datum, 'Time Stamp': timeConverter(datum['Time Stamp']) }
            : datum;

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
  type: PropTypes.oneOf(['block', 'tx', 'account', 'bp']).isRequired,
  totalSupply: PropTypes.string,
};

TableWithIcon.defaultProps = {
  totalSupply: null,
};

export default TableWithIcon;
