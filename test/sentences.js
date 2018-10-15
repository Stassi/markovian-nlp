import { expect } from 'chai';
import { sentences } from '../src';
import sampleDocument from './sampleDocument';

describe('#sentences', () => {
  const {
    wandering: {
      distribution,
      document,
    },
  } = sampleDocument;

  const generatedWanderingSentence = seed => ({
    [1]: 'i would promote introduce a constant succession and hindering the path and application getting the train they cannot keep their roving i would sooner reconcile and contemplative part of the way to direct them',
    [2]: 'i have discovered no other way to find that train they seem to be glad to be done as may be avoided of our thoughts close to our thoughts by a proper and inure them',
    [4]: 'he that yet for ought i know this essay and inure them into the discovery we might be naturally of great differences that will find',
  })[seed];

  describe('ngrams input', () => {
    const oneNondeterministic = { distribution };
    const oneDeterministic = { ...oneNondeterministic, seed: 1 };
    const threeDeterministic = { ...oneDeterministic, count: 3 };

    it('returns a nondeterministic sentence', () => {
      const [sentence] = sentences(oneNondeterministic);
      expect(sentence).to.be.a('string');
    });

    it('returns a deterministic sentence', () => {
      expect(sentences(oneDeterministic)).to.include.members([generatedWanderingSentence(1)]);
    });

    it('returns multiple deterministic sentences', () => {
      expect(sentences(threeDeterministic)).to.include.members([
        generatedWanderingSentence(1),
        'he that train they seem to be glad to be done as may be avoided of our thoughts close to our thoughts by a proper and inure them',
        'this wandering of attention and yet for ought i know this wandering thoughts i would promote introduce a contrary habit',
      ]);
    });
  });

  describe('text input', () => {
    const oneNondeterministic = { document };
    const oneDeterministic = { ...oneNondeterministic, seed: 1 };
    const threeDeterministic = { ...oneDeterministic, count: 3 };

    it('returns a nondeterministic sentence', () => {
      const [sentence] = sentences(oneNondeterministic);
      expect(sentence).to.be.a('string');
    });

    it('returns a deterministic sentence', () => {
      expect(sentences(oneDeterministic)).to.include.members([generatedWanderingSentence(1)]);
    });

    it('returns multiple deterministic sentences', () => {
      expect(sentences(threeDeterministic)).to.include.members([
        generatedWanderingSentence(1),
        'he that train they seem to be glad to be done as may be avoided of our thoughts close to our thoughts by a proper and inure them',
        'this wandering of attention and yet for ought i know this wandering thoughts i would promote introduce a contrary habit',
      ]);
    });
  });
});
