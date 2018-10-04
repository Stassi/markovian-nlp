import {
  identity,
  ifElse,
  is,
  pipe,
} from 'ramda';
import createSentence from './createSentence';
import ngramsDistribution from './ngramsDistribution';

const isString = is(String);

const oneSentence = document => seed =>
  createSentence({ seed, distribution: ngramsDistribution(document) });

// TODO: Implement predicate
const multipleOut = identity;

const options = pipe(
  ({ document, seed, count = 1 }) => {
    const res = { count, document, seed, multipleOut };
    console.log({ res });
    // TODO: random[newMethod] seed1 => count => [seed1, seed2, seed3] (length == count)
    return res;
  },
);

const sentences = ifElse(
  isString,
  oneSentence,
  options,
);

export default sentences;
