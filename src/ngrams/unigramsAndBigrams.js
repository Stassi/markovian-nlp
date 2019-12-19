import compromise from 'compromise';
import ngrams from 'compromise-ngrams';

const nlp = compromise.extend(ngrams);

const [
  bigrams,
  endgrams,
  startgrams,
  unigrams,
] = [
  'bigrams',
  'endgrams',
  'startgrams',
  'unigrams',
].map((methodName) => (document) => nlp(document)[methodName](
  methodName === 'bigrams' ? {} : { max: 1 },
).map(
  methodName === 'unigrams'
    ? ({ normal }) => normal
    : ({ count, normal }) => ({ count, normal }),
));

const unigramsAndBigrams = {
  bigrams,
  endgrams,
  startgrams,
  unigrams,
};

export default unigramsAndBigrams;
