import { expect } from 'chai';

import app from '../utils/testApp';

import Block from './model';

describe('blocks', () => {
  it('empty list', async () => {
    const blocks = await Block.findAll();
    expect(blocks).deep.equal([]);
    await app.get('/api/v1/blocks').expect(200, { blocks: [] });
  });
});
