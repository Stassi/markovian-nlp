import {
  filter,
  lt,
  pipe,
  propSatisfies,
  reduce,
  toPairs,
} from 'ramda';
import weightedRandom from './weightedRandom';

const greaterThanZero = lt(0);
const propGreaterThanZero = propSatisfies(greaterThanZero);
const startgrams = propGreaterThanZero('_start');
const filterStartgrams = filter(startgrams);

const unseededStartgram = pipe(
  filterStartgrams,
  // TODO: Reduce duplication
  toPairs,
  reduce(
    ({ values, weights }, [value, { _start: weight }]) => ({
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

export default unseededStartgram;
