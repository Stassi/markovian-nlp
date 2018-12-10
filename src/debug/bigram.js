import {
  last,
  omit,
  pipe,
  prop,
  reduce,
  toPairs,
} from 'ramda';
import { weighted as weightedRandom } from '../random';

// TODO: Rename
const findBigram = pipe(
  prop('unigrams'),
  last,
  prop,
);

const corpusProp = prop('corpus');
const omitEnd = omit(['_end']);
// TODO: Rename
const getDistribution = x => pipe(
  corpusProp,
  x,
  omitEnd,
);

// TODO: Rename
const bigramDistribution = pipe(
  findBigram,
  getDistribution,
);

// TODO: Rename, merge with unseeded (eliminate distribution prop)
const debugThree = ({
  ...props,
}) => {
  const res = {
    ...props,
    distribution: bigramDistribution(props)(props),
  };
  return res;
};

// TODO: Rename
const getUnseeded = pipe(
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

// TODO: Rename
const debugTwo = ({
  distribution,
  ...props
}) => {
  const res = {
    ...props,
    unseeded: getUnseeded(distribution),
  };
  // TODO: Select most recent unigram as corpus index
  console.log(res);
  return res;
};

// TODO: Rename
const debug = ({
  unigrams,
  ...props
}) => {
  const res = {
    ...props,
    unigrams: [
      ...unigrams,
      'DEBUG',
    ],
  };
  return res;
};

const bigram = pipe(
  debugThree,
  debugTwo,
  debug,
);

export default bigram;
