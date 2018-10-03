import {
  identity,
  ifElse,
  is,
} from 'ramda';
import createSentence from './createSentence';
import ngramsDistribution from './ngramsDistribution';

const isString = is(String);

const oneSentence = document => seed =>
  createSentence({ seed, distribution: ngramsDistribution(document) });

// TODO: Implement
const options = identity;

const sentences = ifElse(
  isString,
  oneSentence,
  options,
);

export default sentences;
