import { pipe } from 'ramda';
import { evolveSeedProp } from '../random';
// TODO: Prefer named import
import toLastUnigram from '../unigrams/toLastUnigram';

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

const generateOne = pipe(
  toLastUnigram,
  ({ ...props }) => {
    const res = { ...props };
    // TODO: Investigate (lastUnigram === null)
    return res;
  },
  toBigram,
  evolveSeedProp,
  appendToUnigrams,
);

export default generateOne;
