import {
  ifElse,
  isEmpty,
  omit,
  pipe,
  reduce,
  toPairs,
} from 'ramda';
import { weighted as weightedRandom } from '../random';

const onlyBigramWeights = omit(['_end', '_start']);

// TODO: Reduce duplication with unseeded startgrams
// TODO: Extract/simplify
const weightsToUnseeded = pipe(
  onlyBigramWeights,
  ifElse(
    isEmpty,
    () => () => null,
    pipe(
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
    ),
  ),
);

const unseeded = corpus => lastUnigram =>
  weightsToUnseeded(corpus[lastUnigram]);

export default unseeded;
