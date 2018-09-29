import {
  filter,
  lt,
  map,
  omit,
  pipe,
  prop,
  propSatisfies,
} from 'ramda';
import { evolveSeedProp } from '../random';
import endOrExtendSentence from './endOrExtendSentence';
import followingUnigram from './followingUnigram';
import unigramDistribution from './unigramDistribution';

const greaterThanZero = lt(0);
const propGreaterThanZero = propSatisfies(greaterThanZero);

const isStartgram = propGreaterThanZero('_start');
const startProp = prop('_start');

const findStartgram = pipe(
  filter(isStartgram),
  followingUnigram(startProp),
);

const unseededStartgram = ({ distribution, ...props }) => ({
  ...props,
  distribution,
  unseededStartgram: findStartgram(distribution),
});

const startgram = ({
  unseededStartgram,
  seed,
  ...props
}) => ({
  ...props,
  seed,
  startgram: unseededStartgram(seed),
});

const omitStart = omit(['_start']);
const mapOmitStart = map(omitStart);

const stripStartgramsDistribution = ({ distribution, ...props }) =>
  ({ ...props, distribution: mapOmitStart(distribution) });

const findUnigramDistribution = ({ distribution, ...props }) => ({
  ...props,
  distribution,
  findUnigramDistribution: unigramDistribution(distribution),
});

// TODO: Rename to followingUnigramDistribution
const nextUnigramDistribution = ({
  findUnigramDistribution,
  startgram,
  ...props
}) => ({
  ...props,
  startgram,
  nextUnigramDistribution: findUnigramDistribution(startgram),
});

const startSentence = ({ startgram, ...props }) =>
  ({ ...props, sentence: [startgram] });

const createSentence = pipe(
  unseededStartgram,
  startgram,
  evolveSeedProp,
  stripStartgramsDistribution,
  findUnigramDistribution,
  nextUnigramDistribution,
  startSentence,
  endOrExtendSentence,
);

export default createSentence;
