import { expect } from 'chai';
import endOfSentence from '../../src/markovSentences/endOfSentence';

describe('markovSentences', () => {
  describe('#endOfSentence', () => {
    const sentenceEnded = endOfSentence({
      _end: 1,
      alpha: 1,
      beta: 1,
    });

    it('should return deterministic values when provided known seeds', () => {
      expect(sentenceEnded(1)).to.be.false;
      expect(sentenceEnded(5)).to.be.true;
    });

    it('should return nondeterministic boolean without seed', () => {
      expect(sentenceEnded()).to.be.a('boolean');
    });
  });
});
