import { expect } from 'chai';
import followingBigram from '../../src/markovSentences/followingBigram';

describe('markovSentences', () => {
  describe('#followingBigram', () => {
    const balanced = followingBigram({
      beta: 1,
      delta: 1,
    });

    it('should return deterministic values when provided known seeds', () => {
      expect(balanced(1)).to.equal('beta');
      expect(balanced(3)).to.equal('delta');
    });

    it('should return nondeterministic value without seed', () => {
      expect(balanced()).to.be.a('string');
    });
  });
});
