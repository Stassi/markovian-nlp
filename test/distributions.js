import { expect } from 'chai';
import distributions from '../src/distributions';

describe('#distributions', () => {
  const sentence = 'First the word, then the last. First, last. Sometimes the word.';

  it('should return distributions of bigrams, startgrams, & endgrams', () => {
    expect(distributions(sentence)).to.deep.include({
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
