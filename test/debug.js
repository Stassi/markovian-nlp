import { expect } from 'chai';
import sentences from '../src/debug';
import lovelyQuote from './lovelyQuote';

// TODO: Rename
describe('#sentences DEBUG', () => {
  const { compoundDistribution: corpus } = lovelyQuote;

  describe('seeded', () => {
    const { generated, seed } = sentences({
      corpus,
      seed: 1,
    });

    it('NEEDS A NAME', () => {
      expect(generated).to.equal('debug');
    });

    it('NEEDS A NAME', () => {
      expect(seed).to.equal(1);
    });
  });

  describe('unseeded', () => {
    const { generated, seed } = sentences({ corpus });

    it('NEEDS A NAME', () => {
      expect(generated).to.equal('debug');
    });

    it('NEEDS A NAME', () => {
      expect(seed).to.equal(1);
    });
  });
});
