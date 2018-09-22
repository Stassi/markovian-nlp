import {
  applySpec,
  pipe,
  reduce,
} from 'ramda';
import bigrams from '../bigrams';
import bigramsDistribution from './bigramsDistribution';
import unigrams from '../unigrams';
import unigramsDistribution from './unigramsDistribution';

const distributions = pipe(
  applySpec({
    bigrams,
    unigrams,
  }),
  ({
     bigrams: bigramsData,
     unigrams: {
       all: allUnigrams,
       end: endUnigrams,
       start: startUnigrams,
     },
   }) => reduce(
    (acc, unigram) => ({
      ...acc,
      [unigram]: {
        // TODO: Reduce duplication
        ...bigramsDistribution(unigram)(bigramsData),
        _end: unigramsDistribution(unigram)(endUnigrams),
        _start: unigramsDistribution(unigram)(startUnigrams),
      },
    }),
    {},
    allUnigrams,
  ),
);

export default distributions;
