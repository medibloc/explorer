import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import { GlobalActions } from '../../redux/actionCreators';
import { timezoneMatcher, titleConverter } from '../../lib';

import './DetailWrapper.scss';


const titles = {
  block: ['Block Height', 'Time Stamp', 'Block Hash', 'Prev Hash', 'Amount', 'No.Tx', 'BP'],
  tx: ['Transaction Hash', 'Status', 'Time Stamp', 'From', 'To', 'Amount'],
  account: ['Account', 'Balance', 'Transactions'],
};

const linkTo = {
  block: ['block/Prev Hash', 'account/BP'],
  tx: ['account/From', 'account/To'],
  account: [],
};

const DetailWrapper = ({ data, type }) => {
  const titleList = type ? titles[type] : [];
  const linkList = type ? linkTo[type] : [];

  return (
    <div className="detailWrapper">
      <div className="detailWrapperKey">
        {
          titleList.map(title => (
            <span key={title}>
              <FormattedMessage id={titleConverter(title)} />
            </span>
          ))
        }
      </div>
      <div className="detailWrapperValue">
        {
          titleList.map((title) => {
            for (let i = 0; i < linkList.length; i += 1) {
              if (linkList[i].indexOf(title) !== -1) {
                return (
                  <span key={title}>
                    {
                      (title === 'From' || title === 'To') && (
                        <button
                          type="button"
                          onClick={() => GlobalActions.openModal({ modalData: data[title], modalType: 'QrCode' })}
                        >
                          <img
                            src="/image/icon/ico-qr.png"
                            alt="qr"
                          />
                        </button>
                      )
                    }
                    <NavLink to={`/${linkList[i].split('/')[0]}/${data[title]}`}>
                      { data[title] }
                    </NavLink>
                  </span>
                );
              }
            }
            return (
              <span key={title}>
                {
                  title === 'Time Stamp' ? (
                    timezoneMatcher(data[title])
                  ) : (
                    data[title]
                  )
                }
              </span>
            );
          })
        }
      </div>
    </div>
  );
};

DetailWrapper.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default DetailWrapper;
