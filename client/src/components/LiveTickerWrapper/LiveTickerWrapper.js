import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './LiveTickerWrapper.scss';


// Reference: https://stackoverflow.com/a/2901298
const injectComma = supply => supply.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

const LiveTickerWrapper = ({
  title,
  type,
  suffix,
  medxPrice,
  mode,
  totalSupply,
  totalSupplyExcludingBurned,
  side,
}) => (
  <div className={cx('liveTickerWrapperGuide', { mobile: mode === 2, [side]: true })}>
    <div className="liveTickerWrapper">
      <div className="liveTickerWrapperTitle">
        {title}
      </div>
      <div className="liveTickerWrapperContent">
        <div>
          { getContent(type, medxPrice, totalSupply, totalSupplyExcludingBurned) }
        </div>
        <div className="liveTickerWrapperContentSuffix">
          {suffix}
        </div>
      </div>
    </div>
  </div>
);

export const contentType = {
  medxPrice: "medxPrice",
  totalSupply: "totalSupply",
  totalSupplyExcludingBurned: "totalSupplyExcludingBurned",
}

function getContent(type, medxPrice, totalSupply, totalSupplyExcludingBurned) {
  switch (type) {
    case contentType.medxPrice:
      return medxPrice.toFixed(5)
    case contentType.totalSupply:
      return injectComma(totalSupply)
    case contentType.totalSupplyExcludingBurned:
      return injectComma(totalSupplyExcludingBurned)
    default:
      return "N/A"
  }
}

LiveTickerWrapper.propTypes = {
  medxPrice: PropTypes.number,
  mode: PropTypes.number.isRequired,
  totalSupply: PropTypes.string,
  totalSupplyExcludingBurned: PropTypes.string,
  side: PropTypes.string.isRequired,
  suffix: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

LiveTickerWrapper.defaultProps = {
  medxPrice: 0,
  totalSupply: '0',
  totalSupplyExcludingBurned: '0',
};

export default LiveTickerWrapper;
