import { pipe } from 'ramda';
import generateUnigram from './unigram';
import untilUnigramsEqualWordCount from './untilUnigramsEqualWordCount';

// TODO: Allow looping by restoring startgrams
const setDefaultUnigrams = ({ unigrams = [], ...props }) => ({ ...props, unigrams });
const generateUnigramsUntilWordLimit = untilUnigramsEqualWordCount(generateUnigram);

// TODO: Rename
const debug = pipe(
  setDefaultUnigrams,
  generateUnigramsUntilWordLimit,
  ({ unigrams, ...props }) => {
    const res = {
      props,
      // TODO: Conditional formatting
      generated: null,
      // TODO: Implement iteration counter and enforce limit
      // TODO:   i.e.: loop via untilEndgramDetected(generate && inc(iterations)
      iterations: null,
    };
    return res;
  }
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
