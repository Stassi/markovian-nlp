import { last, pipe } from 'ramda';
import { evolveSeedProp } from '../random';

const toLastUnigram = ({ unigrams, ...props }) => ({
  ...props,
  unigrams,
  lastUnigram: last(unigrams),
});

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
