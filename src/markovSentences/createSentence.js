import {
  pipe,
  prop,
} from 'ramda';
import endOrExtendSentence from './endOrExtendSentence';
import startgram from './startgram';

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

const createSentence = pipe(
  startgram,
  startSentence,
  endOrExtendSentence,
);

export default createSentence;
