import {
  find,
  propEq,
  propOr,
} from 'ramda';

const unigramsDistribution = unigrams => unigram => propOr(
  0,
  'count',
  {
    ...find(
      propEq('normal', unigram),
      unigrams,
    ),
  },
);

export default unigramsDistribution;
