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
        'to be most useful to our minds as perhaps may come into the studious and hinder them and keep their wandering thoughts quite from taking off our care in the conduct of it can and application',
        'this wandering of this is not the application getting the train they endeavor their roving i think it i suppose may be imagined ; or beating for ought i am satisfied is not angry chiding or confusion can and unsought ideas that even when they would sooner reconcile and going before them',
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
        'to be most useful to our minds as perhaps may come into the studious and hinder them and keep their wandering thoughts quite from taking off our care in the conduct of it can and application',
        'this wandering of this is not the application getting the train they endeavor their roving i think it i suppose may be imagined ; or beating for ought i am satisfied is not angry chiding or confusion can and unsought ideas that even when they would sooner reconcile and going before them',
      ]);
    });
  });
});
