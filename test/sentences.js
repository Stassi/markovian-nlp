import { expect } from 'chai';
import { sentences } from '../src';

describe('#sentences', () => {
  describe('curried binary interface', () => {
    const document = 'word';
    const oneWordDocument = sentences(document);

    describe('nondeterministic', () => {
      it('should return a one-word document', () => {
        // TODO: Should be a string due to random result
        expect(oneWordDocument()).to.equal(document);
      });
    });

    describe('deterministic', () => {
      it('should return a one-word document', () => {
        expect(oneWordDocument(1)).to.equal(document);
      });
    });

    it('should test sentences with more than a single word');
  });

  describe('unary interface', () => {
    const document = 'birds have featured in culture and art since prehistoric times';
    const seed = 1;
    const oneNondeterministic = { document };
    const oneDeterministic = { ...oneNondeterministic, seed };
    const threeDeterministic = { ...oneDeterministic, count: 3 };

    it('returns a nondeterministic sentence', () => {
      expect(sentences(oneNondeterministic)).to.equal('alpha');
    });

    it('returns a deterministic sentence', () => {
      expect(sentences(oneDeterministic)).to.equal('alpha');
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
