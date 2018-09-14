import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import { GlobalActions } from '../../redux/actionCreators';

import './SimpleWrapper.scss';


const clickOutside = (targetId, handler, on = true) => {
  const targetElement = document.getElementById(targetId);
  if (on) {
    document.addEventListener('click', (e) => handler(e, targetElement));
  } else {
    document.removeEventListener('click', handler, true);
  }
};


class SimpleWrapper extends Component {
  constructor(props){
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
    const { data, lang, searchFrom, type } = this.props;
    const dataExist = data && data.length > 0;

    return (
      <div className="simpleWrapper" id={`${type}Search`}>
        <div className={cx('simpleWrapperContentBox', { nothing: !dataExist || searchFrom !== type, top: type === 'top' })}>
          { data && data.map(datum => (
            <div className="simpleWrapperContent" key={datum.data} onClick={GlobalActions.closeModal}>
              <NavLink to={`/${lang}/${datum.type}/${datum.data}`}>
                {datum.type} : {datum.data}
              </NavLink>
            </div>))
          }
        </div>
      </div>
    );git 
  }
};

export default SimpleWrapper;
