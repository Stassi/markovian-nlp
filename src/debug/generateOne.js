import { pipe } from 'ramda';
import isEndgram from './isEndgram';
import generateUnigramsUntilEndgramDetected from './generateUnigramsUntilEndgramDetected';
import unseededBigram from './unseededBigram';
import unseededStartgram from './unseededStartgram';

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

const setDefaultUnigrams = ({
  unigrams = [],
  ...props
}) => ({
  ...props,
  unigrams,
});

// TODO: Rename
const debug = pipe(
  toUnseededStartgram,
  toUnseededBigram,
  toIsEndgram,
  setDefaultUnigrams,
  generateUnigramsUntilEndgramDetected,
  ({ iterations, unigrams, ...props }) => {
    // TODO: Conditional formatting
    const res = {
      ...props,
      generated: null,
      iterations: null,
    };
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
