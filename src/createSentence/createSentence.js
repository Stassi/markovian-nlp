import { pipe } from 'ramda';
import endOrExtendSentence from './endOrExtendSentence';
import findUnigram from './findUnigram';
import startgram from './startgram';

const startSentence = ({
  distribution,
  startgram,
  ...props
}) => ({
  ...props,
  distribution,
  // TODO: Partial application
  nextUnigramDistribution: findUnigram(distribution)(startgram),
  sentence: [startgram],
});

const createSentence = pipe(
  startgram,
  startSentence,
  endOrExtendSentence,
);

export default createSentence;
