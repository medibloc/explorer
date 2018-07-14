import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Navigation from '../Navigation';
import BlockWrapper from '../../components/BlockWrapper';
import ListWrapper from '../../components/ListWrapper';
import { BlockchainActions, GlobalActions, WidgetActions as w } from '../../redux/actionCreators';
import { blocksInPage } from '../../config';


const blockRanger = (page, height) => {
  if (height < blocksInPage) return { from: 1, to: height };
  let from = height - page * blocksInPage + 1;
  let to = height - (page - 1) * blocksInPage;
  if (from < 1) from = 1;
  if (to < 1) to = 0;
  return { from, to };
};

const spacing = [1,1,3,1]
const titles = ['height', 'timestamp', 'blockHash', 'NoTx'];
const data = [{
  height: 12312,
  timestamp: 12331,
  blockHash: 'asdfdafsdafds',
  NoTx: 1,
},{
  height: 12312,
  timestamp: 12331,
  blockHash: 'asdfdafsdafds',
  NoTx: 1,
},{
  height: 12312,
  timestamp: 12331,
  blockHash: 'asdfdafsdafds',
  NoTx: 1,
}];

class BlockList extends Component {
  constructor(props) {
    super(props);
    this.getBlocks = this.getBlocks.bind(this);
  }

  componentWillMount() {
    this.getBlocks();
  }

  componentDidUpdate(prevProps) {
    const { page } = this.props;
    if (page !== prevProps.page) this.getBlocks();
  }

  componentWillUnmount() {
    GlobalActions.movePage(1);
  }

  getBlocks() {
    const { page, medState: { height } } = this.props;
    const { from, to } = blockRanger(page, height);
    w.loader(BlockchainActions.getBlocks({ from, to }));
  }

  render() {
    const { blockList, loading } = this.props;
    return loading ? (
      <div>
        LOADING
      </div>
    ) : (
      <div>
        <ListWrapper titles={titles} data={data} spacing={spacing}>
        </ListWrapper>
        {/*BLOCK LIST
        {
          blockList.map(block => (
            <BlockWrapper key={block.height}>
              <div>
                <NavLink to={'/block?height=' + block.height}>
                  {block.height}
                </NavLink>
              </div>
              <div>{block.timestamp}</div>
              <div>{block.hash}</div>
              <div>{block.transactions.length}</div>
              <div>{block.coinbase}</div>
            </BlockWrapper>
          ))
        }
        */}<Navigation />
      </div>
    );
  }
}

const mapStateToProps = ({ blockchain, global, widget }) => ({
  blockList: blockchain.blockList,
  medState: blockchain.medState,

  loading: widget.loading,

  page: global.page,
});

export default connect(mapStateToProps)(BlockList);
