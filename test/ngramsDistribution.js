import { expect } from 'chai';
import { ngramsDistribution } from '../src';
import lovelyQuote from './lovelyQuote';

describe('#ngramsDistribution', () => {
  const {
    compoundDistribution,
    distributions: [
      firstDistribution,
      secondDistribution,
      thirdDistribution,
    ],
    text: [
      firstText,
      secondText,
      thirdText,
    ],
  } = lovelyQuote;

  describe('String input', () => {
    it('should return distributions of bigrams, startgrams, & endgrams', () => {
      expect(ngramsDistribution(firstText)).to.deep.equal(firstDistribution);
      expect(ngramsDistribution(secondText)).to.deep.equal(secondDistribution);
      expect(ngramsDistribution(thirdText)).to.deep.equal(thirdDistribution);
    });
  });

  describe('Object input', () => {
    it('should return its own input', () => {
      expect(ngramsDistribution(firstDistribution)).to.deep.equal(firstDistribution);
      expect(ngramsDistribution(secondDistribution)).to.deep.equal(secondDistribution);
      expect(ngramsDistribution(thirdDistribution)).to.deep.equal(thirdDistribution);
    });
  });

  describe('Array[String] input', () => {
    it('should return distributions of bigrams, startgrams, & endgrams', () => {
      expect(ngramsDistribution([firstText])).to.deep.equal(firstDistribution);
      expect(ngramsDistribution([secondText])).to.deep.equal(secondDistribution);
      expect(ngramsDistribution([thirdText])).to.deep.equal(thirdDistribution);
    });
  });

  describe('Array[Object] input', () => {
    it('should return its own input', () => {
      expect(ngramsDistribution([firstDistribution])).to.deep.equal(firstDistribution);
      expect(ngramsDistribution([secondDistribution])).to.deep.equal(secondDistribution);
      expect(ngramsDistribution([thirdDistribution])).to.deep.equal(thirdDistribution);
    });
  });

  describe('Array[Object, String, Object] input', () => {
    it('should return compound distributions of bigrams, startgrams, & endgrams', () => {
      expect(ngramsDistribution([
        firstDistribution,
        secondText,
        thirdDistribution,
      ])).to.deep.equal(compoundDistribution);
    });
  });

  describe('Array[String, Object, String] input', () => {
    it('should return compound distributions of bigrams, startgrams, & endgrams', () => {
      expect(ngramsDistribution([
        firstText,
        secondDistribution,
        thirdText,
      ])).to.deep.equal(compoundDistribution);
    });
  });
});
