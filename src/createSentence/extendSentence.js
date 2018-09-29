import {
  omit,
  pipe,
  prop,
} from 'ramda';
import { evolveSeedProp } from '../random';
import followingBigram from './followingBigram';

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

export default extendSentence;
