import {
  map,
  of,
  pipe,
} from 'ramda';
import applyToString from './applyToString';
import toDistribution from './toDistribution';

const stringsToDistributions = applyToString(toDistribution);

const mergeDistributions = () => {
  // TODO: Merge (sum) all distributions
};

const ngramsDistribution = pipe(
  applyToString(of),
  map(stringsToDistributions),
  mergeDistributions,
);

export default ngramsDistribution;
