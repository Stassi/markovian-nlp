import {
  applySpec,
  map,
  pipe,
  reduce,
} from 'ramda';
import applyToString from './applyToString';
import { bigrams, unigrams } from '../distributions';
import ngrams from '../ngrams';

const applyToStrings = pipe(
  applyToString,
  map,
);

const toDistribution = pipe(
  applySpec(ngrams),
  ({
    bigrams: bigramsData,
    unigrams: {
      end: endUnigrams,
      start: startUnigrams,
      ...props
    },
  }) => ({
    ...props,
    endCount: unigrams(endUnigrams),
    followingCounts: bigrams(bigramsData),
    startCount: unigrams(startUnigrams),
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
