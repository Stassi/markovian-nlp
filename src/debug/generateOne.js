import { pipe, until } from 'ramda';
import generateUnigram from './unigram';
import isEndgram from './isEndgram';
import toLastUnigram from './toLastUnigram';
import unseededBigram from './unseededBigram';
import unseededStartgram from './unseededStartgram';
import untilUnigramsEqualWordCount from './untilUnigramsEqualWordCount';

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
const debugPredicate = pipe(
  toLastUnigram,
  ({
    isEndgram,
    lastUnigram,
    ...props
  }) => isEndgram(lastUnigram),
);

const generateUnigramsUntilWordLimit = untilUnigramsEqualWordCount(generateUnigram);

// TODO: Rename
const debugAction = pipe(
  generateUnigramsUntilWordLimit,
  ({ ...props }) => {
    const res = { ...props };
    return res;
  },
);

// TODO: Rename
const debugLoop = until(
  debugPredicate,
  debugAction,
);

// TODO: Rename
const debug = pipe(
  toUnseededStartgram,
  toUnseededBigram,
  toIsEndgram,
  setDefaultUnigrams,
  debugLoop,
  ({ unigrams, ...props }) => {
    const res = {
      props,
      // TODO: Conditional formatting
      generated: null,
      // TODO: Implement iteration counter and enforce limit
      // TODO:   i.e.: loop via untilEndgramDetected(generate && inc(iterations)
      // TODO: Implement endgram detection predicate
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
