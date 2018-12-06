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

const applyCorpusProp = ({ corpus, ...props }) => ({
  ...props,
  corpus,
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

// TODO: Extract submodules, SoC
const startgram = pipe(
  applyCorpusProp,
  removeStartgramWeights,
  applySeedProp,
  evolveSeedProp,
  toUnigramsHead,
);

export default startgram;
