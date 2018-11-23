import { expect } from 'chai';
import sentences from '../src/debug';

// TODO: Rename
describe('#sentences DEBUG', () => {
  it('should be a function', () => {
    expect(sentences).to.be.a('function');
  });
});
