import nlp from 'compromise';
import {
  map,
  omit,
  pipe,
} from 'ramda';

const omitSize = omit(['size']);
const bigrams = pipe(
  x => nlp(x).ngrams({ max: 2 }).bigrams().data(),
  map(omitSize),
);

export default bigrams;
