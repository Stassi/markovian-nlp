import {
  equals,
  inc,
  isEmpty,
  not,
  or,
  pipe,
  propSatisfies,
  unless,
  until,
} from 'ramda';
import generateUnigram from './generateOne';
import toLastUnigram from './toLastUnigram';
import untilUnigramsEqualWordCount from './untilUnigramsEqualWordCount';
import { evolveSeedProp } from '../random';

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
  iterations,
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

const iterationLimitReached = ({
  iterations,
  iterationLimit,
}) => equals(
  iterations,
  iterationLimit,
);

const unigramsPropsIsNotEmptyOrIterationLimitReached = or(
  unigramsPropsIsNotEmpty,
  iterationLimitReached,
);
const untilUnigramsPropsIsNotEmptyOrIterationLimitReached = until(unigramsPropsIsNotEmptyOrIterationLimitReached);
const generateMany = untilUnigramsPropsIsNotEmptyOrIterationLimitReached(generateAndIterateUnigramsAndEvolveSeed);

export default generateMany;
