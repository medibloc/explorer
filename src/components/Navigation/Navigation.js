import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { GlobalActions } from '../../redux/actionCreators';
import { contentsInPage, navigationDisplay } from '../../config';

import './Navigation.scss';


const moveToPage = pageNum => GlobalActions.movePage(pageNum);
const pages = (currentPage, lastPage, pageDisplay) => {
  // eslint-disable-next-line no-param-reassign
  if (lastPage < pageDisplay) pageDisplay = lastPage;
  const pageNation = [];
  let startPage = currentPage - Math.floor(pageDisplay / 2);
  if (startPage < 1) startPage = 1;
  if (currentPage + Math.floor(pageDisplay / 2) > lastPage) startPage = lastPage - pageDisplay + 1;
  for (let i = startPage; i < startPage + pageDisplay; i += 1) {
    pageNation.push(
      <button onClick={() => moveToPage(i)} type="button" className={currentPage === i ? 'active' : null} key={i}>
        {i}
      </button>,
    );
  }
  return pageNation;
};

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      let page = Math.floor(e.target.value);
      if (page < 1) page = 1;
      if (page > this.lastPage()) page = this.lastPage();
      moveToPage(page);
    }
  }

  lastPage() {
    const {
      accounts,
      last,
      txList,
      type,
    } = this.props;

    switch (type) {
      case 'account':
        return Math.ceil(txList.length / contentsInPage);
      case 'accounts':
        return Math.ceil(accounts.length / contentsInPage);
      case 'block':
        return Math.ceil(txList.length / contentsInPage);
      case 'blocks':
        return Math.ceil((last - 1) / contentsInPage);
      case 'txs':
        return 1;
      default:
        return 1;
    }
  }

  render() {
    const { page } = this.props;
    const lastPage = this.lastPage();

    return (
      <div className="navigation">
        <button onClick={() => moveToPage(1)} type="button">
          {'<<'}
        </button>
        <button onClick={() => moveToPage(page - 1)} type="button" disabled={page === 1}>
          {'<'}
        </button>
        {
          pages(page, lastPage, navigationDisplay)
        }
        <button onClick={() => moveToPage(page + 1)} type="button" disabled={page === lastPage}>
          {'>'}
        </button>
        <button onClick={() => moveToPage(lastPage)} type="button">
          {'>>'}
        </button>
      </div>
    );
  }
}

Navigation.propTypes = {
  accounts: PropTypes.array,
  last: PropTypes.number,
  page: PropTypes.number.isRequired,
  txList: PropTypes.array,
  type: PropTypes.oneOf([
    'account',
    'accounts',
    'block',
    'blocks',
    'tx',
    'txs',
  ]).isRequired,
};

Navigation.defaultProps = {
  accounts: [],
  last: 1,
  txList: [],
};

export default Navigation;
