import {
  inc,
  pipe,
  unless,
  until,
} from 'ramda';
import toLastUnigram from './toLastUnigram';
import untilUnigramsEqualWordCount from './untilUnigramsEqualWordCount';
import generateUnigram from './unigram';
import evolveSeedProp from '../random/evolveSeedProp';

const lastUnigramIsEndgram = pipe(
  toLastUnigram,
  ({
     isEndgram,
     lastUnigram,
     ...props
   }) => isEndgram(lastUnigram),
);

const untilLastUnigramIsEndgram = until(lastUnigramIsEndgram);
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

const generateUnigrams = pipe(
  generateUnigramsUntilWordLimit,
  emptyUnigramsUnlessLastIsEndgram,
  incrementIterations,
  evolveSeedProp,
);

// TODO: Enforce iteration limit
// TODO: Consider changing predicate to unigrams.length > 0
const generateUnigramsUntilEndgramDetected = untilLastUnigramIsEndgram(generateUnigrams);

export default generateUnigramsUntilEndgramDetected;
