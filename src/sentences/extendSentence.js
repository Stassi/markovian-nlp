import {
  identity,
  omit,
  pipe,
} from 'ramda';
import { evolveSeedProp } from '../random';
import followingUnigram from './followingUnigram';
import unigramDistribution from './unigramDistribution';

// TODO: Rename/inline
const nextUnigram = pipe(
  omit(['_end']),
  followingUnigram(identity),
);

const extendSentence = pipe(
  evolveSeedProp,
  ({
    followingUnigramDistribution,
    seed,
    ...props
  }) => ({
    ...props,
    seed,
    // TODO: Partial application
    nextUnigram: nextUnigram(followingUnigramDistribution)(seed),
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
    followingUnigramDistribution: unigramDistribution(distribution)(nextUnigram),
    sentence: [...sentence, nextUnigram],
  }),
);

export default extendSentence;
