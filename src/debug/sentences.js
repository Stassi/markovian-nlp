import { pipe } from 'ramda';
import {
  numericize as numericizeSeed,
  restore as restoreSeed,
  save as saveSeed,
} from '../seed';
import generateSentences from './generateSentences';
import setDefaults from './setDefaults';

const sentences = pipe(
  setDefaults,
  numericizeSeed,
  saveSeed,
  generateSentences,
  restoreSeed,
  (x) => {
    // TODO: Implement
    return x;
  },
);

export default sentences;
