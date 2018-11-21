import {
  map,
  of,
  mergeWith,
  pipe,
  reduce,
  sum,
} from 'ramda';
import applyToString from './applyToString';
import toDistribution from './toDistribution';

const stringsToDistributions = applyToString(toDistribution);

// TODO: Extract composable mergeWith, rename params, remove redundant params
const mergeDistributions = reduce(
  (t, u) => mergeWith(
    (v, w) => mergeWith(
      (x, y) => sum([x, y]),
      v,
      w,
    ),
    t,
    u,
  ),
  {},
);

const ngramsDistribution = pipe(
  applyToString(of),
  map(stringsToDistributions),
  mergeDistributions,
);

export default ngramsDistribution;
