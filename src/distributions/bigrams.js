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

// TODO: Semantic disambiguation
const bigrams = bigramsData => precedingUnigram => pipe(
  filter(
    propSatisfies(
      startsWith(`${precedingUnigram} `),
      'normal',
    ),
  ),
  followingUnigramCounts,
)(bigramsData);

export default bigrams;
