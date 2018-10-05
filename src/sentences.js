import {
  ifElse,
  is,
  map,
  pipe,
} from 'ramda';
import { evolveSeeds } from './random';
import createSentence from './createSentence';
import ngramsDistribution from './ngramsDistribution';

const isString = is(String);

const oneSentence = document => seed =>
  createSentence({ seed, distribution: ngramsDistribution(document) });

// TODO: Rename, reorganize
const options = pipe(
  ({ document, ...props }) => ({
    ...props,
    sentence: oneSentence(document),
  }),
  ({
     seed,
     count = 1,
     ...props
   }) => ({
    ...props,
    seeds: evolveSeeds({ count, seed }),
  }),
  ({ seeds, sentence }) => map(sentence, seeds),
);

const sentences = ifElse(
  isString,
  oneSentence,
  options,
);

export default sentences;
