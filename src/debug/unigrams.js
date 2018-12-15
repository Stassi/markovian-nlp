import {
  inc,
  isEmpty,
  not,
  pipe,
  propSatisfies,
  unless,
  until,
} from 'ramda';
import { evolveSeedProp } from '../random';
import {
  toLastUnigram,
  untilUnigramsEqualWordCount,
  generateOne as generateUnigram,
} from '../unigrams';

const lastUnigramIsEndgram = pipe(
  toLastUnigram,
  ({
     isEndgram,
     lastUnigram,
     ...props
   }) => isEndgram(lastUnigram),
);
const unlessLastUnigramIsEndgram = unless(lastUnigramIsEndgram);

const generateUnigramsUntilWordLimit = untilUnigramsEqualWordCount(generateUnigram);

const emptyUnigrams = ({ ...props }) => ({ ...props, unigrams: [] });
const emptyUnigramsUnlessLastIsEndgram = unlessLastUnigramIsEndgram(emptyUnigrams);

const incrementIterations = ({
  iterations = 0,
  ...props
}) => ({
  ...props,
  iterations: inc(iterations),
});

const generateAndIterateUnigramsAndEvolveSeed = pipe(
  generateUnigramsUntilWordLimit,
  emptyUnigramsUnlessLastIsEndgram,
  incrementIterations,
  evolveSeedProp,
);

// TODO: Reduce predicate duplication with unigram module
const propIsEmpty = propSatisfies(isEmpty);
const unigramsPropIsEmpty = propIsEmpty('unigrams');
const unigramsPropsIsNotEmpty = pipe(
  unigramsPropIsEmpty,
  not,
);
const untilUnigramsPropIsNotEmpty = until(unigramsPropsIsNotEmpty);
const unigrams = untilUnigramsPropIsNotEmpty(generateAndIterateUnigramsAndEvolveSeed);

export default unigrams;
