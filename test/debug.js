import { expect } from 'chai';
import lovelyQuote from './lovelyQuote';
import sentences from '../src/debug';

// TODO: Replace with expected values once known
const debug = '__DEBUG';

// TODO: Rename
describe('#sentences DEBUG', () => {
  // TODO: Test corpus String
  const { compoundDistribution: corpus } = lovelyQuote;
  const words = 4;

  describe('seeded', () => {
    const seed = 1;

    describe('count: 10', () => {
      const options = {
        corpus,
        seed,
        words,
        count: 10,
      };
      const {
        generated,
        iterations,
        seed: seedOut,
      } = sentences(options);

      it('should generate 10 formatted sentences', () => {
        expect(generated).to.have.ordered.members([
          "What a lovely day.",
          "Oh what a day.",
          "Oh what a day.",
          "Oh what a day.",
          "Oh what a day.",
          "Oh what a day.",
          "Oh what a day.",
          "Oh what a day.",
          "Oh what a day.",
          "Oh what a day.",
        ]);
      });

      it('should include 10 separate iteration counts', () => {
        expect(iterations).to.have.ordered.members([
          1,
          4,
          2,
          3,
          1,
          1,
          3,
          1,
          2,
          4,
        ]);
      });

      it('should include the provided seed', () => {
        expect(seedOut).to.equal(seed);
      });

      describe('unformatted', () => {
        const { generated } = sentences({ ...options, format: false });

        it('should generate 10 unformatted sentences', () => {
          expect(generated).to.equal(debug);
        });
      });
    });
  });

  describe('unseeded', () => {
    const {
      generated: [generated],
      iterations: [iterations],
      seed: seedOut,
    } = sentences({
      corpus,
      words,
    });

    it('should include numeric iterations', () => {
      expect(iterations).to.be.a('number');
    });

    it('should generate nondeterministic text', () => {
      expect(generated).to.be.a('string');
    });

    it('should return a numeric seed', () => {
      expect(seedOut).to.be.a('number');
    });
  });
});
