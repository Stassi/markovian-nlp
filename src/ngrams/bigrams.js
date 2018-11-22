import nlp from 'compromise';
import { map, pipe } from 'ramda';
import omitSize from './omitSize';

const bigrams = pipe(
  x => nlp(x).ngrams({ max: 2 }).bigrams().data(),
  map(omitSize),
);

export default bigrams;
