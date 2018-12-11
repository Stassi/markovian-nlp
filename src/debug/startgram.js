import {
  filter,
  lt,
  map,
  omit,
  pipe,
  prop,
  propSatisfies,
  reduce,
  toPairs,
} from 'ramda';
import {
  evolveSeedProp,
  weighted as weightedRandom,
} from '../random';

// TODO: Reduce startgram/endgram predicate duplication
const greaterThanZero = lt(0);
const propGreaterThanZero = propSatisfies(greaterThanZero);
const isStartgram = propGreaterThanZero('_start');
const filterStartgram = filter(isStartgram);

const findStartgram = pipe(
  filterStartgram,
  toPairs,
  reduce(
    ({ values, weights }, [value, weight]) => ({
      values: [...values, value],
      // TODO: Consider extraction, replacement of prop('start')
      weights: [...weights, prop('_start', weight)],
    }),
    {
      values: [],
      weights: [],
    },
  ),
  weightedRandom,
);

// TODO: Rename as toUnseeded, reduce duplication with bigrams
const applyCorpusProp = ({ corpus, ...props }) => ({
  ...props,
  corpus,
  // TODO: Rename as { unseeded }
  unseededStartgram: findStartgram(corpus),
});

const omitStart = omit(['_start']);
const mapOmitStart = map(omitStart);
const removeStartgramWeights = ({
  corpus,
  ...props
}) => ({
  ...props,
  corpus: mapOmitStart(corpus),
});

const applySeedProp = ({
  seed,
  unseededStartgram,
  ...props
}) => ({
  ...props,
  seed,
  startgram: unseededStartgram(seed),
});

const toUnigramsHead = ({ startgram, ...props }) => ({
  ...props,
  unigrams: [startgram]
});

// TODO: Extract submodules, SoC, move bigram-duplicates upstream
const startgram = pipe(
  applyCorpusProp,
  removeStartgramWeights,
  applySeedProp,
  evolveSeedProp,
  toUnigramsHead,
);

export default startgram;
