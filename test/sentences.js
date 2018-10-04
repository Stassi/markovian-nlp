import { expect } from 'chai';
import { sentences } from '../src';

describe('#sentences', () => {
  const document = 'First the word, then the last. First, last. Sometimes the word.';

  describe('curried binary interface', () => {
    const oneSentence = sentences(document);

    describe('unseeded', () => {
      it('should return a nondeterministic string', () => {
        expect(oneSentence()).to.be.a('string');
      });
    });

    describe('seeded', () => {
      it('should return deterministic sentences', () => {
        expect(oneSentence(1)).to.equal('first the word');
        expect(oneSentence(2)).to.equal('first last');
        expect(oneSentence(4)).to.equal('sometimes the last');
      });
    });
  });

  describe('unary interface', () => {
    const seed = 1;
    const oneNondeterministic = { document };
    const oneDeterministic = { ...oneNondeterministic, seed };
    const threeDeterministic = { ...oneDeterministic, count: 3 };

    it('returns a nondeterministic sentence', () => {
      expect(sentences(oneNondeterministic)).to.include.members(['alpha']);
    });

    it('returns a deterministic sentence', () => {
      expect(sentences(oneDeterministic)).to.include.members(['alpha']);
    });

    it('returns multiple deterministic sentences', () => {
      expect(sentences(threeDeterministic)).to.include.members([
        'alpha',
        'beta',
        'gamma',
      ]);
    });
  });
});
