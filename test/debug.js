import { expect } from 'chai';
import sentences from '../src/debug';
import lovelyQuote from './lovelyQuote';

// TODO: Rename
describe('#sentences DEBUG', () => {
  const { compoundDistribution } = lovelyQuote;

  describe('seeded', () => {
    const { generated, seed } = sentences({
      corpus: compoundDistribution,
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
    const { generated, seed } = sentences({ corpus: compoundDistribution });

    it('NEEDS A NAME', () => {
      expect(generated).to.equal('debug');
    });

    it('NEEDS A NAME', () => {
      expect(seed).to.equal(1);
    });
  });
});
