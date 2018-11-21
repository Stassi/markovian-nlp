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

// TODO: Attempt R.mergeDeepWith simplification
const mergeDistributions = reduce(
  mergeWith(
    mergeWith(
      (x, y) => sum([x, y]),
    ),
  ),
  {},
);

const ngramsDistribution = pipe(
  applyToString(of),
  map(stringsToDistributions),
  mergeDistributions,
);

export default ngramsDistribution;
