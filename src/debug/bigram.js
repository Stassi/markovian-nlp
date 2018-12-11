import {
  last,
  omit,
  pipe,
  prop,
  reduce,
  toPairs,
} from 'ramda';
import {
  evolveSeedProp,
  weighted as weightedRandom,
} from '../random';

// TODO: Extract
const toUnseeded = pipe(
  toPairs,
  reduce(
    ({ values, weights }, [value, weight]) => ({
      values: [...values, value],
      weights: [...weights, weight],
    }),
    {
      values: [],
      weights: [],
    },
  ),
  weightedRandom,
);

// TODO: Extract
const toDistribution = pipe(
  last,
  prop,
  x => pipe(
    x,
    omit(['_end']),
  ),
);

const unigramsAndCorpusToDistribution = ({
  corpus,
  unigrams,
  ...props
}) => ({
  ...props,
  corpus,
  unigrams,
  distribution: toDistribution(unigrams)(corpus),
});

const distributionToUnseeded = ({
  distribution,
  ...props
}) => ({
  ...props,
  unseeded: toUnseeded(distribution),
});

const applySeed = ({
  seed,
  unseeded,
  ...props
}) => ({
  ...props,
  seed,
  bigram: unseeded(seed),
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

// TODO: Extract submodules, SoC, move startgram-duplicates upstream
const bigram = pipe(
  unigramsAndCorpusToDistribution,
  distributionToUnseeded,
  applySeed,
  evolveSeedProp,
  appendToUnigrams,
);

export default bigram;
