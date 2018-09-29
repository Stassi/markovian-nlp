import {
  omit,
  pipe,
} from 'ramda';
import { evolveSeedProp } from '../random';
import findUnigram from './findUnigram';
import followingBigram from './followingBigram';

// TODO: Rename, inline
const nextUnigram = pipe(
  omit(['_end']),
  followingBigram,
);

const extendSentence = pipe(
  evolveSeedProp,
  ({
    nextUnigramDistribution,
    seed,
    ...props
   }) => ({
    ...props,
    seed,
    // TODO: Reduce duplication
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
    // TODO: Partial application
    nextUnigramDistribution: findUnigram(distribution)(nextUnigram),
    sentence: [...sentence, nextUnigram],
  }),
);

export default extendSentence;
