import {
  pipe,
  reduce,
  toPairs,
} from 'ramda';
import weightedRandom from './weightedRandom';

const followingBigram = pipe(
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

export default followingBigram;
