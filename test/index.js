import { expect } from 'chai';
import main from '../src';

describe('main function', () => {
  it('should return an object', () => {
    expect(main('')).to.be.an('object');
  });
});
