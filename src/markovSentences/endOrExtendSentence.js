import {
  ifElse,
  join,
  omit,
  pipe,
  prop,
} from 'ramda';
import { evolveSeed } from '../random';
import endOfSentence from './endOfSentence';
import followingBigram from './followingBigram';

// TODO: Rename or inline
const nextUnigramDistribution = ({ distribution, precedingUnigram }) =>
  prop(precedingUnigram, distribution);

const sentenceEnded = ({ nextUnigramDistribution, seed }) =>
  endOfSentence(nextUnigramDistribution)(seed);

const endSentence = pipe(
  prop('sentence'),
  join(' '),
);

const nextUnigram = pipe(
  omit(['_end']),
  followingBigram,
);

const extendSentence = pipe(
  ({ seed, ...props }) => ({ ...props, seed: evolveSeed(seed) }),
  ({
    nextUnigramDistribution,
    seed,
    ...props
   }) => ({
    ...props,
    nextUnigram: nextUnigram(nextUnigramDistribution)(seed),
    seed: evolveSeed(seed),
  }),
  ({
    distribution,
    nextUnigram,
    sentence,
    ...props
  }) => ({
    ...props,
    distribution,
    nextUnigramDistribution: nextUnigramDistribution({
      distribution,
      precedingUnigram: nextUnigram,
    }),
    sentence: [...sentence, nextUnigram],
  }),
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
