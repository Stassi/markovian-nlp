import {
  applySpec,
  omit,
  pipe,
  propOr,
  sum,
  values,
} from 'ramda';
import weightedRandom from './weightedRandom';

const propOrZero = propOr(0);

const end = '_end';
const omitEnd = omit([end]);
const endWeight = propOrZero(end);

const continueWeight = pipe(
  omitEnd,
  values,
  sum,
);

const toWeights = pipe(
  applySpec({
    continueWeight,
    endWeight,
  }),
  ({ continueWeight, endWeight }) => ([endWeight, continueWeight]),
);

const endOfSentence = pipe(
  toWeights,
  weights => ({
    weights,
    values: [true, false],
  }),
  weightedRandom,
);

export default endOfSentence;
