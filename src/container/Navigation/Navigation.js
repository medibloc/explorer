import React, { Component } from 'react';
import { connect } from 'react-redux';

import { GlobalActions } from '../../redux/actionCreators';
import { blocksInPage } from '../../config';

import './Navigation.scss';

const moveToPage = pageNum => GlobalActions.movePage(pageNum);

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount() {
    console.log('ha');
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
    const { page, last, loading } = this.props;
    const lastPage = this.lastPage();

    return loading ? (
      <div>
        LOADING
      </div>
    ) : (
      <div className="navigation">
        <button onClick={() => moveToPage(1)} type="button">
          First
        </button>
        <button onClick={() => moveToPage(page - 1)} type="button">
          Before
        </button>
        <div>
          Page
          <input onKeyPress={this.handleKeyPress} />
          /
          { lastPage }
        </div>
        <button onClick={() => moveToPage(page + 1)} type="button">
          Next
        </button>
        <button onClick={() => moveToPage(lastPage)} type="button">
          Last
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
