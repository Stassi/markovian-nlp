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
      expect(sentences(oneDeterministic)).to.include.members([
        'this i have discovered no other way to be able to be able to find that shall propose such a constant succession and keep their roving i know this may take notice of this i must acknowledge that even when they   keep our thoughts i suppose may be imagined ; and i have discovered no other way to the great advantage if ate can be if ate can be done as we may be avoided of the path and yet for ought i would sooner reconcile and keep our thoughts quite from taking off our thoughts by leading them'
      ]);
    });

    it('returns multiple deterministic sentences', () => {
      expect(sentences(threeDeterministic)).to.include.members([
        'this i have discovered no other way to be able to be able to find that shall propose such a constant succession and keep their roving i know this may take notice of this i must acknowledge that even when they   keep our thoughts i suppose may be imagined ; and i have discovered no other way to the great advantage if ate can be if ate can be done as we may be avoided of the path and yet for ought i would sooner reconcile and keep our thoughts quite from taking off our thoughts by leading them',
        'to be naturally of ideas in our thoughts by leading them and everyone may come into view but the chief yet we are upon ; or so much as to the former part of the endeavoring as may come into our thoughts quite from running away with all those rougher methods which more distract their business but such as we might be imagined ; and contemplative part of it can be glad to direct that hitherto i have discovered no other way to direct that none may be able to their minds from straggling',
        'this i must acknowledge that yet for ought i suspect so to be imagined ; and contemplative part of our present enquiry and by frequent attention and in hand'
      ]);
    });
  });
});
