import { pipe } from 'ramda';
import {
  restore as restoreSeed,
  save as saveSeed,
} from './seed';
import generateSentences from './generateSentences';
import numericizeSeed from './numericizeSeed';

const defaults = ({
  count = 1,
  format = true,
  iterationLimit = 999999999,
  words = 15,
  ...props
}) => ({
  ...props,
  count,
  format,
  iterationLimit,
  words,
});

const sentences = pipe(
  defaults,
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
