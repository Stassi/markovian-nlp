import {
  ifElse,
  join,
  map,
  omit,
  pipe,
  prop,
} from 'ramda';
import endOfSentence from './endOfSentence';
import evolveSeed from '../evolveSeed';
import followingBigram from './followingBigram';
import unseededStartgram from './unseededStartgram';

const omitStart = omit(['_start']);
const mapOmitStart = map(omitStart);

const startgram = ({ distribution, seed }) => ({
  distribution: mapOmitStart(distribution),
  seed: evolveSeed(seed),
  startgram: unseededStartgram(distribution)(seed),
});

// TODO: Rename or inline
const nextUnigramDistribution = ({ distribution, precedingUnigram }) =>
  prop(precedingUnigram, distribution);

const startSentence = ({
  distribution,
  startgram,
  ...props
}) => ({
  ...props,
  distribution,
  nextUnigramDistribution: nextUnigramDistribution({
    distribution,
    precedingUnigram: startgram,
  }),
  sentence: [startgram],
});

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

const createSentence = pipe(
  startgram,
  startSentence,
  endOrExtendSentence,
);

export default createSentence;
