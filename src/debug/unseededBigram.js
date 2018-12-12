import {
  omit,
  pipe,
  reduce,
  toPairs,
} from 'ramda';
import { weighted as weightedRandom } from '../random';

const onlyBigramWeights = omit(['_end', '_start']);

// TODO: Reduce duplication with unseededStartgram
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

const unseededBigram = corpus => lastUnigram =>
  weightsToUnseeded(corpus[lastUnigram]);

export default unseededBigram;
