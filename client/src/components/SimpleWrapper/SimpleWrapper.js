import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { GlobalActions } from '../../redux/actionCreators';

import './SimpleWrapper.scss';


const clickOutside = (targetId, handler, on = true) => {
  const targetElement = document.getElementById(targetId);
  if (on) {
    document.addEventListener('click', e => handler(e, targetElement));
  } else {
    document.removeEventListener('click', handler, true);
  }
};


class SimpleWrapper extends Component {
  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    const { type } = this.props;
    clickOutside(`${type}Search`, this.handleClickOutside, true);
  }

  componentWillUnmount() {
    const { type } = this.props;
    clickOutside(`${type}Search`, this.handleClickOutside, false);
  }

  handleClickOutside(e, targetElement) {
    const { searchFrom } = this.props;
    const isClickInside = targetElement.contains(e.target);
    const isTarget = targetElement.id.indexOf(searchFrom) !== -1;

    if (!isClickInside && isTarget) GlobalActions.removeSearchResult();
  }

  render() {
    const {
      data, lang, search, searchFrom, type,
    } = this.props;
    const dataExist = data && data.length > 0;

    return (
      <div className="simpleWrapper" id={`${type}Search`}>
        <div className={cx('simpleWrapperContentBox', {
          nothing: searchFrom !== type || (!dataExist && search === ''),
          top: type === 'top',
        })}
        >
          {dataExist ? data.map(datum => (
            <div
              className="simpleWrapperContent"
              onClick={GlobalActions.closeModal}
              key={datum.data}
            >
              <NavLink to={`/${lang}/${datum.type}/${datum.data}`}>
                {datum.type} : {datum.data}
              </NavLink>
            </div>)) : search !== '' && (
              <div
                className="simpleWrapperContent"
                onClick={() => GlobalActions.setSearchText('')}
              >
                <span>
                  No matches found
                </span>
              </div>)
          }
        </div>
      </div>
    );
  }
}

SimpleWrapper.propTypes = {
  data: PropTypes.array.isRequired,
  lang: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  searchFrom: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default SimpleWrapper;
