import {
  omit,
  pipe,
  reduce,
  toPairs,
} from 'ramda';
import { weighted as weightedRandom } from '../random';

const onlyBigramWeights = omit(['_end', '_start']);

// TODO: Reduce duplication with unseeded
const weightsToUnseeded = pipe(
  onlyBigramWeights,
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

const unseeded = corpus => lastUnigram =>
  weightsToUnseeded(corpus[lastUnigram]);

export default unseeded;
