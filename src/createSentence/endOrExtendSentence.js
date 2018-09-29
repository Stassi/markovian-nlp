import {
  ifElse,
  join,
  omit,
  pipe,
  prop,
} from 'ramda';
import endOfSentence from './endOfSentence';
import evolveSeedProp from './evolveSeedProp';
import followingBigram from './followingBigram';

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

// TODO: Rename or inline, reduce duplication
const nextUnigramDistribution = ({ distribution, precedingUnigram }) =>
  prop(precedingUnigram, distribution);

const extendSentence = pipe(
  evolveSeedProp,
  ({
    nextUnigramDistribution,
    seed,
    ...props
   }) => ({
    ...props,
    seed,
    nextUnigram: nextUnigram(nextUnigramDistribution)(seed),
  }),
  evolveSeedProp,
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
