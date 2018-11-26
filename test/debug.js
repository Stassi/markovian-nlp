import { expect } from 'chai';
import lovelyQuote from './lovelyQuote';
import sentences from '../src/debug';

// TODO: Replace with expected values once known
const debug = '__DEBUG';

// TODO: Rename
describe('#sentences DEBUG', () => {
  const { compoundDistribution: corpus } = lovelyQuote;

  describe('seeded', () => {
    const seed = 1;

    describe('returned values', () => {
      const {
        generated,
        iterations,
        seed: seedOut,
      } = sentences({ corpus, seed });

      it('should include the iteration count', () => {
        expect(iterations).to.equal(debug);
      });

      it('should include deterministic generated text', () => {
        expect(generated).to.equal(debug);
      });

      it('should include the provided seed', () => {
        expect(seedOut).to.equal(seed);
      });
    });

    describe('count: 10', () => {
      const options = {
        corpus,
        seed,
        count: 10,
      };

      describe('formatted', () => {
        const { generated } = sentences(options);

        it('should generate 10 formatted sentences', () => {
          expect(generated).to.equal(debug);
        });
      });

      describe('unformatted', () => {
        const { generated } = sentences({ ...options, format: false });

        it('should generate 10 unformatted sentences', () => {
          expect(generated).to.equal(debug);
        });
      });
    });

    describe('words: 10', () => {
      const { generated } = sentences({
        corpus,
        seed,
        words: 10,
      });

      it('should generate a 10-word sentence', () => {
        expect(generated).to.equal(debug);
      });
    });

    describe('low iteration limit', () => {
      it('should throw an iteration limit error');
    })
  });

  describe('unseeded', () => {
    const { generated, seed: seedOut } = sentences({ corpus });

    it('should generate nondeterministic text', () => {
      // TODO: Consider testing type, possibly length
      expect(generated).to.equal(debug);
    });

    it('should return a numeric seed', () => {
      expect(seedOut).to.be.a('number');
    });
  });
});
