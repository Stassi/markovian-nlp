import {
  ifElse,
  join,
  pipe,
  prop,
} from 'ramda';
import endOfSentence from './endOfSentence';
import extendSentence from './extendSentence';

// TODO: Inline, pipe, partial application
const sentenceEnded = ({ followingUnigramDistribution, seed }) =>
  endOfSentence(followingUnigramDistribution)(seed);

const endSentence = pipe(
  prop('sentence'),
  join(' '),
);

const endOrExtendSentence = x => ifElse(
  sentenceEnded,
  endSentence,
  pipe(
    extendSentence,
    endOrExtendSentence,
  ),
)(x);

export default endOrExtendSentence;
