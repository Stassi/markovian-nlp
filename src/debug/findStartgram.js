import {
  filter,
  lt,
  pipe,
  prop,
  propSatisfies,
  reduce,
  toPairs,
} from 'ramda';
import { weighted as weightedRandom } from '../random';

// TODO: Reduce startgram/endgram predicate duplication
const greaterThanZero = lt(0);
const propGreaterThanZero = propSatisfies(greaterThanZero);
const isStartgram = propGreaterThanZero('_start');
const filterStartgram = filter(isStartgram);

// TODO: Rename to unseededStartgram
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

export default findStartgram;
