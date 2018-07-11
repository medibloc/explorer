import React from 'react';
import { connect } from 'react-redux';

import ContentBox from '../../components/ContentBox/ContentBox';


const Blocks = ({ blocks }) => (
  <div>
    Here is the block sound!!
    <ul>
      {
        blocks.map(block => (
          <li>
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
