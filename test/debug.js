import { expect } from 'chai';
import lovelyQuote from './lovelyQuote';
import sentences from '../src/debug';

// TODO: Rename
describe('#sentences DEBUG', () => {
  // TODO: Test corpus String
  const { compoundDistribution: corpus } = lovelyQuote;
  const length = 4;

  describe('seeded', () => {
    const seed = 1;

    describe('count: 1', () => {
      const options = {
        corpus,
        length,
        seed,
        count: 1,
      };
      const [
        {
          iterations,
          sentence,
          seed: seedOut,
        },
      ] = sentences(options);

      it('should generate a deterministic sentence', () => {
        expect(sentence).to.equal('__DEBUG__');
      });

      it('should include the iteration count', () => {
        expect(iterations).to.equal('__DEBUG__');
      });

      it('should include the provided seed', () => {
        expect(seedOut).to.equal(seed);
      });
    });
  });
});
