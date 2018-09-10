import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import React from 'react';

import './SimpleWrapper.scss';


const SimpleWrapper = ({ data, searchFrom, type }) => {
  const dataExist = data && data.length > 0;

  return (
    <div className="simpleWrapper">
      <div className={cx('simpleWrapperContentBox', { nothing: !dataExist || searchFrom !== type, top: type === 'top' })}>
        { data && data.map(datum => (
          <div className="simpleWrapperContent" key={datum.data}>
            <NavLink to={`/${datum.type}/${datum.data}`}>
              {datum.type} : {datum.data}
            </NavLink>
          </div>))
        }
      </div>
    </div>
  );
};

export default SimpleWrapper;
