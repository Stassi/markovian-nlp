import {
  dropWhile,
  filter,
  pipe,
  propSatisfies,
  reduce,
  startsWith,
  trim,
} from 'ramda';

const followingUnigram = pipe(
  dropWhile(x => x !== ' '),
  trim,
);

const followingUnigramCounts = reduce(
  (
    acc,
    {
      count,
      normal: bigram,
    },
  ) => ({
    ...acc,
    [followingUnigram(bigram)]: count,
  }),
  {},
);

const bigramsDistribution = startUnigram => pipe(
  filter(
    propSatisfies(
      startsWith(`${startUnigram} `),
      'normal',
    ),
  ),
  followingUnigramCounts,
);

export default bigramsDistribution;
