import {
  find,
  propEq,
  propOr,
} from 'ramda';

const unigrams = unigrams => unigram => propOr(
  0,
  'count',
  {
    ...find(
      propEq('normal', unigram),
      unigrams,
    ),
  },
);

export default unigrams;
