import { expect } from 'chai';
import main from '../src/main';

// TODO: Replace debug test
describe('main', () => {
  it('should return true', () => {
    expect(main()).to.include({ test: true });
  });
});
