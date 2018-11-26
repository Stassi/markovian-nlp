import { pipe } from 'ramda';
import {
  restore as restoreSeed,
  save as saveSeed,
} from './seed';
import generateSentences from './generateSentences';

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
  // TODO: Generate random seed if not a number before saving
  saveSeed,
  generateSentences,
  restoreSeed,
  (x) => {
    // TODO: Implement
    return x;
  },
);

export default sentences;
