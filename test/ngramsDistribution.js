import { expect } from 'chai';
import { ngramsDistribution } from '../src';
import lovelyQuote from './lovelyQuote';

describe('#ngramsDistribution', () => {
  const {
    distributions: {
      compound: compoundDistribution,
      firstHalf: firstHalfDistribution,
      secondHalf: secondHalfDistribution,
    },
    text: [
      firstHalfText,
      secondHalfText,
    ],
  } = lovelyQuote;

  describe('String input', () => {
    it('should return distributions of bigrams, startgrams, & endgrams', () => {
      expect(ngramsDistribution(firstHalfText)).to.deep.equal(firstHalfDistribution);
      expect(ngramsDistribution(secondHalfText)).to.deep.equal(secondHalfDistribution);
    });
  });

  describe('Array[String] input', () => {
    it('should return distributions of bigrams, startgrams, & endgrams', () => {
      expect(ngramsDistribution([firstHalfText])).to.deep.equal(firstHalfDistribution);
      expect(ngramsDistribution([secondHalfText])).to.deep.equal(secondHalfDistribution);
    });
  });

  describe('Array[Object, String] input', () => {
    it('should return compound distributions of bigrams, startgrams, & endgrams', () => {
      expect(ngramsDistribution([
        firstHalfDistribution,
        secondHalfText,
      ])).to.deep.equal(compoundDistribution);
    });
  });

  describe('Array[String, Object] input', () => {
    it('should return compound distributions of bigrams, startgrams, & endgrams', () => {
      expect(ngramsDistribution([
        firstHalfText,
        secondHalfDistribution,
      ])).to.deep.equal(compoundDistribution);
    });
  });
});
