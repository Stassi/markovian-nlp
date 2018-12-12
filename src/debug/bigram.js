import { last, pipe } from 'ramda';
import { evolveSeedProp } from '../random';

const getLastUnigram = ({ unigrams, ...props }) => ({
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
  getLastUnigram,
  toBigram,
  evolveSeedProp,
  appendToUnigrams,
  ({ ...props }) => {
    const res = { ...props };
    return res;
  },
);

export default bigram;
