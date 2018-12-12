import {
  identity,
  omit,
  pipe,
  reduce,
  toPairs,
} from 'ramda';
import { weighted as weightedRandom } from '../random';

// TODO: Implement
const onlyBigramWeights = omit(['_end', '_start']);

// TODO: Rename, implement
const bigramDistributionToUnseeded = pipe(
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

// TODO: Rename, implement
const unseededBigram = corpus => lastUnigram => seed => identity;

export default unseededBigram;
