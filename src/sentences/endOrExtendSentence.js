import {
  applySpec,
  identity,
  ifElse,
  join,
  omit,
  pipe,
  prop,
  propOr,
  sum,
  values,
} from 'ramda';
import extendSentence from './extendSentence';
import { weighted as weightedRandom } from '../random';

const propOrZero = propOr(0);

const end = '_end';
const omitEnd = omit([end]);
const endWeight = propOrZero(end);

const continueWeight = pipe(
  omitEnd,
  values,
  sum,
);

const isEndgram = endWeight => endWeight > 0;

// TODO: Parameterize
const sentenceLengthLimit = 20;

// TODO: Reorganize
const endOfSentence = sentence => pipe(
  applySpec({
    continueWeight,
    endWeight,
  }),
  ifElse(
    ({ endWeight }) => isEndgram(endWeight)
      && sentence.length >= sentenceLengthLimit,
    ({ continueWeight, ...props }) => ({ ...props, continueWeight: 0 }),
    identity,
  ),
  ({ continueWeight, endWeight }) => ([endWeight, continueWeight]),
  weights => ({
    weights,
    values: [true, false],
  }),
  weightedRandom,
);

const endOrExtendSentence = x => ifElse(
  // TODO: Inline, partial application
  ({ followingUnigramDistribution, seed, sentence }) =>
    endOfSentence(sentence)(followingUnigramDistribution)(seed),
  pipe(
    prop('sentence'),
    join(' '),
  ),
  pipe(
    extendSentence,
    endOrExtendSentence,
  ),
)(x);

export default endOrExtendSentence;
