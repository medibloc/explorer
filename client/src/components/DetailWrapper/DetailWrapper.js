import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';

import QrButton from '../QrButton';

import { timezoneMatcher, titleConverter } from '../../lib';
import { detailWrapperConfig } from '../../config';

import './DetailWrapper.scss';


const DetailWrapperKey = ({ titleList }) => (
  <div className="detailWrapperKey">
    {
      titleList.map(title => (
        <span key={title}>
          <FormattedMessage id={titleConverter(title)} />
        </span>
      ))
    }
  </div>
);

const DetailWrapper = ({
  data, lang, mode, type,
}) => {
  const titleList = type ? detailWrapperConfig.titles[type] : [];
  const linkList = type ? detailWrapperConfig.linkTo[type] : [];

  return (
    <div className={cx('detailWrapper', { mobile: mode === 2 })}>
      <DetailWrapperKey titleList={titleList} />
      <div className="detailWrapperValue">
        {
          titleList.map((title) => {
            for (let i = 0; i < linkList.length; i += 1) {
              if (linkList[i].includes(title)) {
                return (
                  <span key={title}>
                    {
                      (['From', 'To'].includes(title)) && (
                        <QrButton modalData={data[title]} />
                      )
                    }
                    {
                      title === 'url'
                        ? (
                          <a href={data[title]}>
                            { data[title] }
                          </a>
                        ) : (
                          <NavLink to={`/${lang}/${linkList[i].split('/')[0]}/${data[title]}`}>
                            { data[title] }
                          </NavLink>
                        )
                    }
                  </span>
                );
              }
            }
            return (
              <span key={title} className={cx({ message: title === 'Message' })}>
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

DetailWrapperKey.propTypes = {
  titleList: PropTypes.array.isRequired,
};

DetailWrapper.propTypes = {
  data: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  mode: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default DetailWrapper;
