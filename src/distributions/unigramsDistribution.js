import {
  find,
  propEq,
  propOr,
} from 'ramda';

const unigramsDistribution = unigram => endUnigrams => propOr(
  0,
  'count',
  {
    ...find(
      propEq('normal', unigram),
      endUnigrams,
    ),
  },
);

export default unigramsDistribution;
