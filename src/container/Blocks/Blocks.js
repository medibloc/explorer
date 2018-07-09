import React, { Component } from 'react';
import { connect } from 'react-redux';


class Blocks extends Component {
  render() {
    const { blocks } = this.props;

    return (
      <div>
        Here is the block sound!!
        <ul>
          <li>
            tail block :
            {JSON.stringify(blocks)}
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ blockchain }) => ({
  blocks: blockchain.blocks,
});

export default connect(mapStateToProps)(Blocks);
