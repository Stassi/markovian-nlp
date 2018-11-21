import {
  applySpec,
  map,
  pipe,
  reduce,
} from 'ramda';
import applyToString from './applyToString';
import bigrams from '../bigrams';
import bigramsDistribution from './bigramsDistribution';
import unigrams from '../unigrams';
import unigramsDistribution from './unigramsDistribution';

const applyToStrings = pipe(
  applyToString,
  map,
);

const toDistribution = pipe(
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

const stringsToDistributions = applyToStrings(toDistribution);

export default stringsToDistributions;
