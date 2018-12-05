import {
  filter,
  lt,
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

const applySeedProp = ({
  seed,
  unseededStartgram,
  ...props
}) => ({
  ...props,
  seed,
  startgram: unseededStartgram(seed),
});

const startgram = pipe(
  applyCorpusProp,
  applySeedProp,
  evolveSeedProp,
);

export default startgram;
