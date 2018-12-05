import {
  map,
  omit,
  pipe,
} from 'ramda';
import { evolveSeedProp } from '../random';
import endOrExtendSentence from './endOrExtendSentence';
import findStartgram from './findStartgram';
import unigramDistribution from './unigramDistribution';

// TODO: Resolve scope collision with startgram parameter of same name
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

const followingUnigramDistribution = ({
  findUnigramDistribution,
  startgram,
  ...props
}) => ({
  ...props,
  startgram,
  followingUnigramDistribution: findUnigramDistribution(startgram),
});

const startSentence = ({ startgram, ...props }) =>
  ({ ...props, sentence: [startgram] });

const createSentence = pipe(
  unseededStartgram,
  startgram,
  evolveSeedProp,
  stripStartgramsDistribution,
  findUnigramDistribution,
  followingUnigramDistribution,
  startSentence,
  endOrExtendSentence,
);

export default createSentence;
