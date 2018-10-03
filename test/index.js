import { expect } from 'chai';
import main from '../src';

describe('main object', () => {
  it('should have keys: [#ngramsDistribution, #sentences]', () => {
    expect(main).to.have.all.keys('ngramsDistribution', 'sentences');
  });
});
