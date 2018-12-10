import {
  ifElse,
  isEmpty,
  propSatisfies,
} from 'ramda';
import generateBigram from './bigram';
import generateStartgram from './startgram';

const propIsEmpty = propSatisfies(isEmpty);
const startgramRequired = propIsEmpty('unigrams');

const unigram = ifElse(
  startgramRequired,
  generateStartgram,
  generateBigram,
);

export default unigram;