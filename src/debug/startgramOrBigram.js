import {
  identity,
  ifElse,
  isEmpty,
  propSatisfies,
} from 'ramda';
import startgram from './startgram';

const propIsEmpty = propSatisfies(isEmpty);
const startgramRequired = propIsEmpty('unigrams');

// TODO: Implement
const bigram = identity;

const startgramOrBigram = ifElse(
  startgramRequired,
  startgram,
  bigram,
);

export default startgramOrBigram;
