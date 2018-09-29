import { pipe } from 'ramda';
import endOrExtendSentence from './endOrExtendSentence';
import startgram from './startgram';
import unigramDistribution from './unigramDistribution';

const findUnigramDistribution = ({ distribution, ...props }) => ({
  ...props,
  distribution,
  findUnigramDistribution: unigramDistribution(distribution),
});

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
  findUnigramDistribution,
  nextUnigramDistribution,
  startSentence,
  endOrExtendSentence,
);

export default createSentence;
