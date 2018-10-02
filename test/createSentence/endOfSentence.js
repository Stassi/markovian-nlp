import { expect } from 'chai';
import endOfSentence from '../../src/createSentence/endOfSentence';

describe('#endOfSentence', () => {
  const threeOutcomes = endOfSentence({
    _end: 1,
    alpha: 1,
    beta: 1,
  });

  // TODO: Prefer singulars, descriptions of [non]determinism
  it('should return deterministic values when provided known seeds', () => {
    expect(threeOutcomes(1)).to.be.false;
    expect(threeOutcomes(5)).to.be.true;
  });

  it('should return nondeterministic boolean without seed', () => {
    expect(threeOutcomes()).to.be.a('boolean');
  });

  describe('distributions without an end weight', () => {
    const withoutEnd = endOfSentence({
      alpha: 1,
      beta: 1,
    });

    it('should return false for distributions without an end weight', () => {
      expect(withoutEnd()).to.be.false;
    });
  });
});
