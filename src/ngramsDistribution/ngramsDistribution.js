import {
  applySpec,
  ifElse,
  identity,
  is,
  of,
  pipe,
  reduce,
} from 'ramda';
import bigrams from '../bigrams';
import bigramsDistribution from './bigramsDistribution';
import unigrams from '../unigrams';
import unigramsDistribution from './unigramsDistribution';

const arrayWrapString = ifElse(
  is(String),
  of,
  identity,
);

const ngramsDistribution = pipe(
  arrayWrapString,
  // TODO: Map strings to distributions, then merge (sum) all distributions
  applySpec({
    bigrams,
    unigrams,
  }),
  ({
    bigrams: bigramsData,
    unigrams: {
      end: endUnigrams,
      start: startUnigrams,
      ...props
    },
  }) => ({
    ...props,
    endCount: unigramsDistribution(endUnigrams),
    followingCounts: bigramsDistribution(bigramsData),
    startCount: unigramsDistribution(startUnigrams),
  }),
  ({
    followingCounts,
    endCount,
    startCount,
    ...props
  }) => ({
    ...props,
    unigramCounts: unigram => ({
      [unigram]: {
        ...followingCounts(unigram),
        _end: endCount(unigram),
        _start: startCount(unigram),
      },
    }),
  }),
  ({
    unigramCounts,
    all: allUnigrams,
  }) => reduce(
    (acc, unigram) => ({
      ...acc,
      ...unigramCounts(unigram),
    }),
    {},
    allUnigrams,
  ),
);

export default ngramsDistribution;
