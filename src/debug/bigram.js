import { pipe } from 'ramda';
import { evolveSeedProp } from '../random';
import toLastUnigram from './toLastUnigram';

const toBigram = ({
  lastUnigram,
  seed,
  unseededBigram,
  ...props
}) => ({
  ...props,
  seed,
  unseededBigram,
  bigram: unseededBigram(lastUnigram)(seed),
});

const appendToUnigrams = ({
  bigram,
  unigrams,
  ...props
}) => ({
  ...props,
  unigrams: [
    ...unigrams,
    bigram,
  ],
});

const bigram = pipe(
  toLastUnigram,
  toBigram,
  evolveSeedProp,
  appendToUnigrams,
);

export default bigram;
