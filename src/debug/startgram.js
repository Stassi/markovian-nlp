import {
  map,
  omit,
  pipe,
} from 'ramda';
import { evolveSeedProp } from '../random';
import unseeded from './unseededStartgram';

// TODO: Rename as toUnseeded, reduce duplication with bigrams
// TODO: Store unseededStartgram/toUnseeded upstream for repeated use
const applyCorpusProp = ({ corpus, ...props }) => ({
  ...props,
  corpus,
  // TODO: Rename as { unseeded }
  unseededStartgram: unseeded(corpus),
});

// TODO: Remove mapOmitStart
const omitStart = omit(['_start']);
const mapOmitStart = map(omitStart);
const removeStartgramWeights = ({
  corpus,
  ...props
}) => ({
  ...props,
  corpus: mapOmitStart(corpus),
});

const applySeedProp = ({
  seed,
  unseededStartgram,
  ...props
}) => ({
  ...props,
  seed,
  startgram: unseededStartgram(seed),
});

const toUnigramsHead = ({ startgram, ...props }) => ({
  ...props,
  unigrams: [startgram]
});

// TODO: Extract submodules, SoC, move bigram-duplicates upstream
const startgram = pipe(
  applyCorpusProp,
  removeStartgramWeights,
  applySeedProp,
  evolveSeedProp,
  toUnigramsHead,
);

export default startgram;
