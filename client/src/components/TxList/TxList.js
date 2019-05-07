import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ListWrapper from '../ListWrapper';
import { BlockchainActions, GlobalActions, WidgetActions as w } from '../../redux/actionCreators';
import TableWithIcon from '../TableWithIcon';
import { listMapper, ranger, spaceMapper } from '../../lib';
import { contentsInPage, txSpaceList, txTitleList } from '../../config';

import './TxList.scss';


class TxList extends Component {
  constructor(props) {
    super(props);
    this.getTxs = this.getTxs.bind(this);
  }

  componentWillMount() {
    const { type } = this.props;
    if (type === 'txs') this.getTxs();
  }

  componentDidUpdate(prevProps) {
    const { account, page, type } = this.props;
    if (page !== prevProps.page) {
      if (type === 'txs') this.getTxs();
      if (type === 'account' && account) this.getAccTxs();
    }
    if (prevProps.account !== account) this.getAccTxs();
  }

  componentWillUnmount() {
    GlobalActions.movePage(1);
  }

  getTxs() {
    const { page, medState: { numTx } } = this.props;
    const { from, to } = ranger(page, numTx, contentsInPage);
    w.loader(BlockchainActions.getTxs({ from, to }));
  }

  getAccTxs() {
    const { account, page } = this.props;
    const { from, to } = ranger(page, account.totalTxs, contentsInPage);
    w.loader(BlockchainActions.getAccountDetail({
      address: account.address,
      from,
      to,
    }));
  }

  render() {
    const {
      mode,
      page,
      txList,
      txs,
      type,
      lang,
    } = this.props;
    const titles = txTitleList[type];
    const spaces = txSpaceList[type];
    const { from, to } = ranger(page, txs.length, contentsInPage);

    return (
      <div className="txList">
        {
          (mode !== 2 && type !== 'txs') && (
            <ListWrapper
              lang={lang}
              titles={titles}
              data={listMapper(type === 'block' ? txs.slice(from, to) : txs, 'tx')}
              spacing={spaceMapper(spaces)}
              linkTo={['tx/hash', 'account/from', 'account/to']}
              centerList={['Amount']}
              rightList={['Amount']}
            />
          )
        }
        {
          (mode === 2 && type !== 'txs') && (
            <ListWrapper
              lang={lang}
              titles={['Transaction Hash']}
              data={listMapper(type === 'block' ? txs.slice(from, to) : txs, 'tx')}
              spacing={spaceMapper([1])}
              linkTo={['tx/hash']}
            />
          )
        }
        {
          (mode === 2 && type === 'txs') && (
            <TableWithIcon
              type="tx"
              data={txList}
              lang={lang}
              mode={mode}
            />
          )
        }
        {
          (mode !== 2 && type === 'txs') && (
            <ListWrapper
              lang={lang}
              titles={titles}
              data={listMapper(txList, 'tx')}
              spacing={spaceMapper(spaces)}
              linkTo={['tx/hash', 'account/from', 'account/to']}
              centerList={['Amount']}
              rightList={['Amount']}
            />
          )
        }
      </div>
    );
  }
}

TxList.propTypes = {
  account: PropTypes.object,
  medState: PropTypes.object,
  txList: PropTypes.array.isRequired,
  txs: PropTypes.array.isRequired,

  lang: PropTypes.string.isRequired,
  mode: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

TxList.defaultProps = {
  account: {},
  medState: {},
};

export default TxList;
