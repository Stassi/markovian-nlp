import {
  pipe,
  reduce,
  toPairs,
} from 'ramda';
import { weighted as weightedRandom } from '../random';

// TODO: Rename
const followingUnigram = (transformWeight) => pipe(
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

export default followingUnigram;
