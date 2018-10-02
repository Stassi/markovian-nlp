import { expect } from 'chai';
import main from '../src';

describe('main object', () => {
  it('should have key: [#ngramsDistribution]', () => {
    expect(main).to.have.all.keys('ngramsDistribution');
  });
});
