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

const bigramsDistribution = bigrams => precedingUnigram => pipe(
  filter(
    propSatisfies(
      startsWith(`${precedingUnigram} `),
      'normal',
    ),
  ),
  followingUnigramCounts,
)(bigrams);

export default bigramsDistribution;
