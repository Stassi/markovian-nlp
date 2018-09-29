import {
  ifElse,
  join,
  pipe,
  prop,
} from 'ramda';
import endOfSentence from './endOfSentence';
import extendSentence from './extendSentence';

const sentenceEnded = ({ nextUnigramDistribution, seed }) =>
  endOfSentence(nextUnigramDistribution)(seed);

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
