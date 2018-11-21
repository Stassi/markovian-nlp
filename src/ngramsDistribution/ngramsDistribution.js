import { of, pipe } from 'ramda';
import additiveMerge from './additiveMerge';
import applyToString from './applyToString';
import stringsToDistributions from './stringsToDistributions';

const ngramsDistribution = pipe(
  applyToString(of),
  stringsToDistributions,
  additiveMerge,
);

export default ngramsDistribution;
