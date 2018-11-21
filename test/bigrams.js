import { expect } from 'chai';
import { bigrams } from '../src/ngrams';

describe('#bigrams', () => {
  const sentence = 'First the word, then the last. First, last. Sometimes the word.';

  it('should return bigrams with count', () => {
    expect(bigrams(sentence)).to.include.deep.members([
      {
        count: 2,
        normal: 'the word',
      },
      {
        count: 1,
        normal: 'sometimes the',
      },
      {
        count: 1,
        normal: 'the last',
      },
    ]);
  });
});
