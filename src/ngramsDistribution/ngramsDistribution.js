import { pipe } from 'ramda';
import additiveMerge from './additiveMerge';
import ensureArrayWrapping from './ensureArrayWrapping';
import stringsToDistributions from './stringsToDistributions';

const ngramsDistribution = pipe(
  ensureArrayWrapping,
  stringsToDistributions,
  additiveMerge,
);

export default ngramsDistribution;
