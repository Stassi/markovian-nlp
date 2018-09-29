import {
  pipe,
  reduce,
  toPairs,
} from 'ramda';
import { weightedRandom } from '../random';

// TODO: Rename
const followingBigram = transformWeight => pipe(
  toPairs,
  reduce(
    ({ values, weights }, [value, weight]) => ({
      values: [...values, value],
      weights: [...weights, transformWeight(weight)],
    }),
    {
      values: [],
      weights: [],
    },
  ),
  weightedRandom,
);

export default followingBigram;
