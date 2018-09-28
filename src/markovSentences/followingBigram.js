import {
  pipe,
  reduce,
  toPairs,
} from 'ramda';
import { weightedRandom } from '../random';

const followingBigram = pipe(
  // TODO: Reduce duplication
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
