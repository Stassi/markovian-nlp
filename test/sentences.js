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
    [1]: 'this wandering thoughts i know this may be able to reject them from straggling',
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
        'to be most useful to bring back gently their minds i would sooner reconcile and hinder them and keep their wandering thoughts quite from taking off our care in the conduct of their uttermost they endeavor their business but such order as may be avoided of equal parts',
        'this wandering of this is not the endeavoring as may be able to become thinking',
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
      expect(sentences(oneDeterministic)).to.include.members([
        'this essay and by leading them and keep them from running away with our thoughts i suspect so easy to be glad to the path and keep our minds as taking notice of it in hand',
      ]);
    });

    it('returns multiple deterministic sentences', () => {
      expect(sentences(threeDeterministic)).to.include.members([
        'this essay and by leading them and keep them from running away with our thoughts i suspect so easy to be glad to the path and keep our minds as taking notice of it in hand',
        'to be naturally of our thoughts quite from taking notice where it may be glad to find that will offer themselves that yet one would sooner reconcile and application',
        'this essay and going before them and flux of great advantage if ate can offer to keep our understandings ; or beating for that even when they endeavor their thought and keep our minds as may be glad to the endeavoring as perhaps help unthinking men in the great differences that yet for ought i must acknowledge that yet we are pertinent to be able by frequent attention and going before them',
      ]);
    });
  });
});
