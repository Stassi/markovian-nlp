import { expect } from 'chai';
import { ngramsDistribution } from '../src';

describe('#ngramsDistribution', () => {
  const sentence = 'First the word, then the last. First, last. Sometimes the word.';

  it('should return distributions of bigrams, startgrams, & endgrams', () => {
    expect(ngramsDistribution(sentence)).to.deep.include({
      sometimes: {
        the: 1,
        _end: 0,
        _start: 1,
      },
    }).and.deep.include({
      word: {
        then: 1,
        _end: 1,
        _start: 0,
      },
    });
  });
});
