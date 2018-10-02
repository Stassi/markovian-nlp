import { expect } from 'chai';
import { sentences } from '../src';

describe('#sentences', () => {
  it('should be a function', () => {
    expect(sentences).to.be.a('function');
  });
});
