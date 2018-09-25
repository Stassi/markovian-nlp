import {
  identity,
  ifElse,
  gte,
  join,
  pipe,
  prop,
} from 'ramda';
import createSentence from './createSentence';

const completed = pipe(
  prop('sentencesOut'),
  gte(0),
);

const joinSentences = pipe(
  prop('sentences'),
  join(' '),
);

// TODO: Implement all
const evolveSeed = identity;
const decrementSentencesOut = identity;

const markovSentences = (state = {
  document: '',
  seed: NaN,
  sentences: [],
  sentencesOut: 0,
}) => ifElse(
  completed,
  joinSentences,
  pipe(
    createSentence,
    evolveSeed,
    decrementSentencesOut,
    markovSentences,
  ),
)(state);

export default markovSentences;
