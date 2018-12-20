import {
  equals,
  inc,
  or,
  pipe,
  unless,
  until,
} from 'ramda';
import generateUnigram from './generateOne';
import toLastUnigram from './toLastUnigram';
import unigramsPropIsNotEmpty from './propIsNotEmpty';
import untilUnigramsEqualWordCount from './untilUnigramsEqualWordCount';
import { evolveSeedProp } from '../random';

const lastUnigramIsEndgram = pipe(
  toLastUnigram,
  ({
     isEndgram,
     lastUnigram,
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

const iterationLimitReached = ({
  iterations,
  iterationLimit,
}) => equals(
  iterations,
  iterationLimit,
);

const unigramsPropsIsNotEmptyOrIterationLimitReached = or(
  unigramsPropIsNotEmpty,
  iterationLimitReached,
);
const untilUnigramsPropsIsNotEmptyOrIterationLimitReached = until(unigramsPropsIsNotEmptyOrIterationLimitReached);
const generateMany = untilUnigramsPropsIsNotEmptyOrIterationLimitReached(generateAndIterateUnigramsAndEvolveSeed);

export default generateMany;
