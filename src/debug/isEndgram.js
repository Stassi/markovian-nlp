import {
  filter,
  flip,
  includes,
  keys,
  lt,
  pipe,
  propSatisfies,
} from 'ramda';

const greaterThanZero = lt(0);
const propGreaterThanZero = propSatisfies(greaterThanZero);
const endgramWeightGreaterThanZero = propGreaterThanZero('_end');
const filterEndgrams = filter(endgramWeightGreaterThanZero);
const includedIn = flip(includes);
const isEndgram = pipe(
  filterEndgrams,
  keys,
  includedIn,
);

export default isEndgram;
