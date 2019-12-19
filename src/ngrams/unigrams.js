import nlp from 'compromise';
import {
  applySpec,
  filter,
  map,
  pipe,
  propEq,
} from 'ramda';
import omitSize from './omitSize';

const sizeOne = propEq('size', 1);

const toUnigrams = (x) => pipe(
  x,
  filter(sizeOne),
  map(omitSize),
);

export const all = (x) => nlp(x).ngrams({ max: 1 }).unigrams().out('array');
export const end = toUnigrams((x) => nlp(x).endGrams().data());
export const start = toUnigrams((x) => nlp(x).startGrams().data());

const unigrams = applySpec({
  all,
  end,
  start,
});

export default unigrams;
