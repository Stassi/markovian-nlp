import { expect } from 'chai';
import { ngramsDistribution } from '../src';

describe('#ngramsDistribution', () => {
  const [firstHalfQuote, secondHalfQuote] = [
    'Oh, what a day.',
    'What a lovely day!',
  ];

  const firstHalfDistribution = {
    'a': {
      '_end': 0,
      '_start': 0,
      'day': 1,
    },
    'day': {
      '_end': 1,
      '_start': 0,
    },
    'oh': {
      '_end': 0,
      '_start': 1,
      'what': 1,
    },
    'what': {
      '_end': 0,
      '_start': 0,
      'a': 1,
    },
  };

  const secondHalfDistribution = {
    'a': {
      '_end': 0,
      '_start': 0,
      'lovely': 1,
    },
    'day': {
      '_end': 1,
      '_start': 0,
    },
    'lovely': {
      '_end': 0,
      '_start': 0,
      'day': 1,
    },
    'what': {
      '_end': 0,
      '_start': 1,
      'a': 1,
    },
  };

  const compoundDistribution = {
    'a': {
      '_end': 0,
      '_start': 0,
      'day': 1,
      'lovely': 1,
    },
    'day': {
      '_end': 2,
      '_start': 0,
    },
    'lovely': {
      '_end': 0,
      '_start': 0,
      'day': 1,
    },
    'oh': {
      '_end': 0,
      '_start': 1,
      'what': 1,
    },
    'what': {
      '_end': 0,
      '_start': 1,
      'a': 2,
    },
  };

  describe('String input', () => {
    it('should return distributions of bigrams, startgrams, & endgrams', () => {
      expect(ngramsDistribution(firstHalfQuote)).to.deep.equal(firstHalfDistribution);
      expect(ngramsDistribution(secondHalfQuote)).to.deep.equal(secondHalfDistribution);
    });
  });

  describe('Array[String] input', () => {
    it('should return distributions of bigrams, startgrams, & endgrams', () => {
      expect(ngramsDistribution([firstHalfQuote])).to.deep.equal(firstHalfDistribution);
      expect(ngramsDistribution([secondHalfQuote])).to.deep.equal(secondHalfDistribution);
    });
  });

  describe('Array[Object, String] input', () => {
    it('should return compound distributions of bigrams, startgrams, & endgrams', () => {
      expect(ngramsDistribution([
        firstHalfDistribution,
        secondHalfQuote,
      ])).to.deep.equal(compoundDistribution);
    });
  });

  describe('Array[String, Object] input', () => {
    it('should return compound distributions of bigrams, startgrams, & endgrams', () => {
      expect(ngramsDistribution([
        firstHalfQuote,
        secondHalfDistribution,
      ])).to.deep.equal(compoundDistribution);
    });
  });
});
