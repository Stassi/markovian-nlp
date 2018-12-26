import { pick, pipe } from 'ramda';
import { unseeded as unseededBigram } from '../bigrams';
import { unseeded as unseededStartgram } from '../startgrams';
import {
  isEndgram,
  format as formatUnigrams,
  generateMany as generateUnigrams,
} from '../unigrams';
import { evolveSeedProp } from '../random';

const pickCorpusFormatIterationLimitSeedAndWords = pick([
  'corpus',
  'format',
  'iterationLimit',
  'seed',
  'words',
]);

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

const pickIterationsAndUnigrams = pick(['iterations', 'unigrams']);

const sentence = pipe(
  pickCorpusFormatIterationLimitSeedAndWords,
  toUnseededStartgram,
  toUnseededBigram,
  toIsEndgram,
  setDefaultIterations,
  setDefaultUnigrams,
  generateUnigrams,
  formatUnigrams,
  pickIterationsAndUnigrams,
);

const toSentence = ({ ...props }) => ({
  ...props,
  sentence: sentence(props),
});

const appendToGeneratedAndIterations = ({
  generated,
  iterations,
  sentence: {
    unigrams,
    iterations: sentenceIterations,
  },
  ...props
}) => ({
  ...props,
  generated: [
    ...generated,
    unigrams,
  ],
  iterations: [
    ...iterations,
    sentenceIterations,
  ],
});

const generateOne = pipe(
  toSentence,
  appendToGeneratedAndIterations,
  evolveSeedProp,
);

export default generateOne;
