import React from 'react';
import { connect } from 'react-redux';

import ContentBox from '../../components/ContentBox/ContentBox';
import ContentWrapper from '../../components/ContentWrapper';

import './Blocks.scss';


const Blocks = ({ blocks }) => (
  <div className="blocks">
    {
      blocks.map(block => (
        // eslint-disable-next-line
        <ContentWrapper type="block" data={block}/>
      ))
    }
  </div>
);


const mapStateToProps = ({ blockchain }) => ({
  blocks: blockchain.blocks,
});

export default connect(mapStateToProps)(Blocks);
