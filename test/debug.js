import { expect } from 'chai';
import lovelyQuote from './lovelyQuote';
import sentences from '../src/debug';

// TODO: Replace with expected values once known
const debug = '__DEBUG';
const debugNumber = 999999999999;
const debugNumbers = [
  debugNumber,
  debugNumber,
  debugNumber,
];

// TODO: Rename
describe('#sentences DEBUG', () => {
  // TODO: Test corpus String
  const { compoundDistribution: corpus } = lovelyQuote;

  describe('seeded', () => {
    const seed = 1;

    describe('returned values', () => {
      const {
        generated: [generated],
        iterations: [iterations],
        seed: seedOut,
      } = sentences({
        corpus,
        seed,
        words: 4,
      });

      it('should include the iteration count', () => {
        expect(iterations).to.equal(1);
      });

      it('should include deterministic generated text', () => {
        expect(generated).to.equal('What a lovely day.');
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
  });

  describe('unseeded', () => {
    const {
      generated: [generated],
      iterations: [iterations],
      seed: seedOut,
    } = sentences({ corpus });

    it('should include numeric iterations', () => {
      expect(iterations).to.be.a('number');
    });

    it('should generate nondeterministic text', () => {
      // TODO: Consider testing type, possibly length
      expect(generated).to.equal(debug);
    });

    it('should return a numeric seed', () => {
      expect(seedOut).to.be.a('number');
    });
  });
});
