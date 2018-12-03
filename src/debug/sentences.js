import { pipe } from 'ramda';
import {
  numericize as numericizeSeed,
  restore as restoreSeed,
  save as saveSeed,
} from '../seed';
import generateMany from './generateMany';
import setDefaults from './setDefaults';
import setIterations from './setIterations';

const sentences = pipe(
  setDefaults,
  numericizeSeed,
  saveSeed,
  generateMany,
  restoreSeed,
  setIterations,
  (x) => {
    // TODO: Implement
    return x;
  },
);

export default sentences;
