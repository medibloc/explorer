import React, { Component } from 'react';
import { connect } from 'react-redux';


import { GlobalActions } from '../../redux/actionCreators';
import { blocksInPage } from '../../config';

import './Navigation.scss';

const moveToPage = pageNum => GlobalActions.movePage(pageNum);
const pages = (currentPage, lastPage, pageDisplay) => {
  const pageNation = [];
  let startPage = currentPage - Math.floor(pageDisplay / 2);
  if (startPage < 1) startPage = 1;
  if (currentPage + Math.floor(pageDisplay / 2) > lastPage) startPage = lastPage - pageDisplay + 1;
  for (let i = startPage; i < startPage + pageDisplay; i += 1) {
    pageNation.push(
      <button onClick={() => moveToPage(i)} type="button" className={currentPage === i && 'active'}>
        {i}
      </button>,
    );
  }
  return pageNation;
};

class Navigation extends Component {
  constructor(props) {
    super(props);
    // TODO bind의 정확한 역
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
    const { last } = this.props;
    return Math.ceil((last - 1) / blocksInPage);
  }

  render() {
    const { page, loading } = this.props;
    const lastPage = this.lastPage();

    return loading ? (
      <div>
        LOADING
      </div>
    ) : (
      <div className="navigation">
        <button onClick={() => moveToPage(1)} type="button">
          {'<<'}
        </button>
        <button onClick={() => moveToPage(page - 1)} type="button">
          {'<'}
        </button>
        {/*<div>
          Page
          <input onKeyPress={this.handleKeyPress} />
          /
          { lastPage }
        </div>*/}
        {
          pages(page, lastPage, 5)
        }
        <button onClick={() => moveToPage(page + 1)} type="button">
          {'>'}
        </button>
        <button onClick={() => moveToPage(lastPage)} type="button">
          {'>>'}
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ blockchain, global, widget }) => ({
  page: global.page,
  last: blockchain.medState.height,
  loading: widget.loading,
});

export default connect(mapStateToProps)(Navigation);
