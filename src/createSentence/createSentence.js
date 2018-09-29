import {
  map,
  omit,
  pipe,
} from 'ramda';
import { evolveSeedProp } from '../random';
import endOrExtendSentence from './endOrExtendSentence';
import startgram from './startgram';
import unigramDistribution from './unigramDistribution';

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
  startgram,
  evolveSeedProp,
  stripStartgramsDistribution,
  findUnigramDistribution,
  nextUnigramDistribution,
  startSentence,
  endOrExtendSentence,
);

export default createSentence;
