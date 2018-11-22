import { expect } from 'chai';
import createSentence from '../src/sentences/createSentence';

describe('#createSentence', () => {
  describe('deterministic startgram-heavy distributions', () => {
    // TODO: Review
    const startgramHeavy = {
      alpha: { _end: 1000, _start: 1, beta: 1 },
      beta: { _end: 1 },
    };

    it('should return a one word sentence', () => {
      expect(createSentence({ distribution: startgramHeavy, seed: 1 })).to.equal('alpha');
    });
  });

  describe('deterministic 2nd ngram-heavy distributions', () => {
    const secondNgramHeavy = {
      alpha: { _end: 1, _start: 1, beta: 1000, delta: 1000 },
      beta: { _end: 1 },
      delta: { _end: 1 },
    };

    // TODO: Prefer singular description
    it('should return known two word sentences', () => {
      expect(createSentence({ distribution: secondNgramHeavy, seed: 1 })).to.equal('alpha delta');
      expect(createSentence({ distribution: secondNgramHeavy, seed: 2 })).to.equal('alpha beta');
    });
  });

  describe('deterministic trigram distributions', () => {
    const trigram = {
      alpha: { _start: 1, beta: 1 },
      beta: { delta: 1 },
      delta: { _end: 1 },
    };

    it('should return known three word sentence', () => {
      expect(createSentence({ distribution: trigram, seed: 1 })).to.equal('alpha beta delta');
    });
  });
});
