import PropTypes from 'prop-types';
import qs from 'query-string';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { GlobalActions } from '../../redux/actionCreators';
import { bpsInPage, contentsInPage, navigationDisplay } from '../../config';

import './Navigation.scss';


const moveToPage = pageNum => GlobalActions.movePage(pageNum);
const pages = (currentPage, lastPage, pageDisplay, curPath) => {
  // eslint-disable-next-line no-param-reassign
  if (lastPage < pageDisplay) pageDisplay = lastPage;
  const pageNation = [];
  let startPage = currentPage - Math.floor(pageDisplay / 2);
  if (startPage < 1) startPage = 1;
  if (currentPage + Math.floor(pageDisplay / 2) > lastPage) startPage = lastPage - pageDisplay + 1;
  for (let i = startPage; i < startPage + pageDisplay; i += 1) {
    pageNation.push(<NavLink to={`${curPath}?page=${i}`} key={i}>
      <button onClick={() => moveToPage(i)} type="button" className={currentPage === i ? 'active' : null}>
        {i}
      </button>
    </NavLink>);
  }
  return pageNation;
};

class Navigation extends Component {
  lastPage() {
    const {
      numAccounts,
      numBlocks,
      numCandidates,
      numTxs,

      account,
      txs,
      type,
    } = this.props;

    switch (type) {
      case 'account':
        return Math.ceil(account ? account.totalTxs / contentsInPage : 0);
      case 'accounts':
        return Math.ceil(numAccounts / contentsInPage);
      case 'block':
        return Math.ceil(txs.length / contentsInPage);
      case 'blocks':
        return Math.ceil(numBlocks / contentsInPage);
      case 'txs':
        return Math.ceil(numTxs / contentsInPage);
      case 'bps':
        return Math.ceil(numCandidates / bpsInPage);
      default:
        return 1;
    }
  }

  render() {
    const { page } = this.props;
    const lastPage = this.lastPage();
    const qpage = parseInt(qs.parse(window.location.search).page, 10) || 1;
    const path = window.location.pathname;

    return (
      <div className="navigation">
        <NavLink to={`${path}?page=1`}>
          <button onClick={() => moveToPage(1)} type="button">
            {'<<'}
          </button>
        </NavLink>
        <NavLink to={`${path}?page=${qpage <= 1 ? 1 : qpage - 1}`}>
          <button onClick={() => moveToPage(page - 1)} type="button" disabled={page === 1}>
            {'<'}
          </button>
        </NavLink>
        {
          pages(page, lastPage, navigationDisplay, path)
        }
        <NavLink to={`${path}?page=${qpage === lastPage ? lastPage : qpage + 1}`}>
          <button onClick={() => moveToPage(page + 1)} type="button" disabled={page === lastPage}>
            {'>'}
          </button>
        </NavLink>
        <NavLink to={`${path}?page=${lastPage}`}>
          <button onClick={() => moveToPage(lastPage)} type="button">
            {'>>'}
          </button>
        </NavLink>
      </div>
    );
  }
}

Navigation.propTypes = {
  account: PropTypes.object,
  numAccounts: PropTypes.number,
  numCandidates: PropTypes.number,
  numTxs: PropTypes.number,
  numBlocks: PropTypes.number,
  txs: PropTypes.array,
  page: PropTypes.number.isRequired,
  type: PropTypes.oneOf([
    'account',
    'accounts',
    'block',
    'blocks',
    'bps',
    'tx',
    'txs',
  ]).isRequired,
};

Navigation.defaultProps = {
  account: {},
  numAccounts: 0,
  numCandidates: 0,
  numTxs: 0,
  numBlocks: 0,
  txs: [],
};

export default Navigation;
