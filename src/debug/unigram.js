import {
  ifElse,
  isEmpty,
  propSatisfies,
} from 'ramda';
import generateBigram from './bigram';
import generateStartgram from './startgram';

const propIsEmpty = propSatisfies(isEmpty);
const startgramRequired = propIsEmpty('unigrams');

// TODO: Reduce duplication among bigrams & startgrams (i.e. evolveSeedProp)
// TODO: Implement iteration limit
const unigram = ifElse(
  startgramRequired,
  generateStartgram,
  generateBigram,
);

export default unigram;
