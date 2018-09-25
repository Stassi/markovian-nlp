import { expect } from 'chai';
import markovSentences from '../src/markovSentences';

describe('#markovSentence', () => {
  describe('with preloaded sentence, zero remaining sentences to output', () => {
    it('should return the preloaded sentence', () => {
      const preloadedSentence = 'preloaded sentence';
      expect(markovSentences({
        document: '',
        seed: 0,
        sentences: [preloadedSentence],
        sentencesOut: 0,
      })).to.equal(preloadedSentence);
    });
  });

  describe('with one sentence remaining to output', () => {
    it('should return a string', () => {
      const debug = markovSentences({
        document: 'First word, then last.',
        seed: 0,
        // sentences: [],
        sentencesOut: 1,
      });
      console.log({ debug });
      expect(debug).to.be.a('string');
    });
  });
});
