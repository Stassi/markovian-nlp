import {
  ifElse,
  isEmpty,
  propSatisfies,
} from 'ramda';
import bigram from './bigram';
import startgram from './startgram';

const propIsEmpty = propSatisfies(isEmpty);
const startgramRequired = propIsEmpty('unigrams');

const startgramOrBigram = ifElse(
  startgramRequired,
  startgram,
  bigram,
);

export default startgramOrBigram;
