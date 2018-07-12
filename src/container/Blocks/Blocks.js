import React from 'react';
import { connect } from 'react-redux';

import ContentBox from '../../components/ContentBox/ContentBox';

import './Blocks.scss';


const Blocks = ({ blocks }) => (
  <div className="blocks">
    BLOCKS
    <ul>
      {
        blocks.map((block, i) => (
          // eslint-disable-next-line
          <li key={i}>
            <ContentBox>
              {JSON.stringify(block)}
            </ContentBox>
          </li>
        ))
      }
    </ul>
  </div>
);


const mapStateToProps = ({ blockchain }) => ({
  blocks: blockchain.blocks,
});

export default connect(mapStateToProps)(Blocks);
