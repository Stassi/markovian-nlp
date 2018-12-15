import {
  ifElse,
  isEmpty,
  propSatisfies,
} from 'ramda';
import generateBigram from './bigram';
import generateStartgram from './startgram';

// TODO: Reduce predicate duplication with unigrams module
const propIsEmpty = propSatisfies(isEmpty);
const startgramRequired = propIsEmpty('unigrams');

// TODO: Reduce duplication among bigrams & startgrams (i.e. evolveSeedProp)
const unigram = ifElse(
  startgramRequired,
  generateStartgram,
  generateBigram,
);

export default unigram;
