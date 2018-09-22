import {
  applySpec,
  pipe,
  reduce,
} from 'ramda';
import bigrams from './bigrams';
import bigramsDistribution from './bigramsDistribution';
import unigrams from './unigrams';

const distributions = pipe(
  applySpec({
    bigrams,
    unigrams,
  }),
  ({
     bigrams: bigramsData,
     unigrams: {
       all: allUnigrams,
       // TODO: Implement
       // end: endUnigrams,
       // start: startUnigrams,
     },
   }) => reduce(
    (acc, precedingUnigram) => ({
      ...acc,
      [precedingUnigram]: {
        ...bigramsDistribution(precedingUnigram)(bigramsData),
        // TODO: Implement
        // _end: null,
        // _start: null,
      },
    }),
    {},
    allUnigrams,
  ),
);

export default distributions;
