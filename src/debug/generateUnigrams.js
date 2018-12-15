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
import generateUnigram from './unigram';
import toLastUnigram from './toLastUnigram';
import untilUnigramsEqualWordCount from './untilUnigramsEqualWordCount';

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

const propIsEmpty = propSatisfies(isEmpty);
const unigramsPropIsEmpty = propIsEmpty('unigrams');
const unigramsPropsIsNotEmpty = pipe(
  unigramsPropIsEmpty,
  not,
);
const untilUnigramsPropIsNotEmpty = until(unigramsPropsIsNotEmpty);
const generateUnigrams = untilUnigramsPropIsNotEmpty(generateAndIterateUnigramsAndEvolveSeed);

export default generateUnigrams;
