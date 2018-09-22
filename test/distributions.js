import { expect } from 'chai';
import distributions from '../src/distributions';

describe('#distributions', () => {
  const sentence = 'First the word, then the last. First, last. Sometimes the word.';

  it('should return bigrams distribution with count', () => {
    expect(distributions(sentence)).to.deep.include({
      the: {
        last: 1,
        word: 2,
      },
    });
  });
});
