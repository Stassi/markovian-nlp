import { pipe } from 'ramda';
import { unseeded as unseededBigram } from '../bigrams';
import { unseeded as unseededStartgram } from '../startgrams';
import {
  isEndgram,
  generateMany as generateUnigrams,
} from '../unigrams';
import formatUnigramsUnlessFormattingDisabledOrUnigramsPropIsEmpty from './formatUnigramsUnlessFormattingDisabledOrUnigramsPropIsEmpty';

const toUnseededStartgram = ({
  corpus,
  ...props
}) => ({
  ...props,
  corpus,
  unseededStartgram: unseededStartgram(corpus),
});

const toUnseededBigram = ({
  corpus,
  ...props
}) => ({
  ...props,
  corpus,
  unseededBigram: unseededBigram(corpus),
});

const toIsEndgram = ({
  corpus,
  ...props
}) => ({
  ...props,
  corpus,
  isEndgram: isEndgram(corpus),
});

const setDefaultIterations = ({
  iterations = 0,
  ...props
}) => ({
  ...props,
  iterations,
});

const setDefaultUnigrams = ({
  unigrams = [],
  ...props
}) => ({
  ...props,
  unigrams,
});

// TODO: Consider merging with unigrams module
// TODO: Rename
const debug = pipe(
  toUnseededStartgram,
  toUnseededBigram,
  toIsEndgram,
  setDefaultIterations,
  setDefaultUnigrams,
  generateUnigrams,
  formatUnigramsUnlessFormattingDisabledOrUnigramsPropIsEmpty,
  ({ ...props }) => {
    // TODO: Return (un)formatted sentence and iterations
    const res = { ...props };
    return res;
  },
);

const toSentence = ({ ...props }) => ({ ...props, sentence: debug(props) });

const appendToGeneratedAndIterations = ({
  generated: previousGenerated,
  iterations: previousIterations,
  sentence: {
    generated,
    iterations,
  },
  ...props
}) => ({
  ...props,
  generated: [
    ...previousGenerated,
    generated,
  ],
  iterations: [
    ...previousIterations,
    iterations,
  ],
});

const generateOne = pipe(
  toSentence,
  appendToGeneratedAndIterations,
);

export default generateOne;
