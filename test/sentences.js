import { expect } from 'chai';
import { sentences } from '../src';
import sampleDocument from './sampleDocument';

describe('#sentences', () => {
  const { wandering: { text: wanderingText } } = sampleDocument;
  // TODO: generatedWanderingSentences
  const generatedWanderingSentence = 'i would promote introduce a constant succession and hindering the path and application getting the train they cannot keep their roving i would sooner reconcile and contemplative part of the way to direct them';

  describe('curried binary interface', () => {
    const wanderingSentence = sentences(wanderingText);

    describe('unseeded', () => {
      it('should return a nondeterministic string', () => {
        expect(wanderingSentence()).to.be.a('string');
      });
    });

    describe('seeded', () => {
      it('should return deterministic sentences', () => {
        expect(wanderingSentence(1)).to.equal(generatedWanderingSentence);
        expect(wanderingSentence(2)).to.equal('i have discovered no other way to find that train they seem to be glad to be done as may be avoided of our thoughts close to our thoughts by a proper and inure them');
        expect(wanderingSentence(4)).to.equal('he that yet for ought i know this essay and inure them into the discovery we might be naturally of great differences that will find');
      });
    });
  });

  describe('unary interface', () => {
    const oneNondeterministic = { document: wanderingText };
    const oneDeterministic = { ...oneNondeterministic, seed: 1 };
    const threeDeterministic = { ...oneDeterministic, count: 3 };

    it('returns a nondeterministic sentence', () => {
      const [sentence] = sentences(oneNondeterministic);
      expect(sentence).to.be.a('string');
    });

    it('returns a deterministic sentence', () => {
      expect(sentences(oneDeterministic)).to.include.members([generatedWanderingSentence]);
    });

    it('returns multiple deterministic sentences', () => {
      expect(sentences(threeDeterministic)).to.include.members([
        generatedWanderingSentence,
        'he that train they seem to be glad to be done as may be avoided of our thoughts close to our thoughts by a proper and inure them',
        'this wandering of attention and yet for ought i know this wandering thoughts i would promote introduce a contrary habit',
      ]);
    });
  });
});
