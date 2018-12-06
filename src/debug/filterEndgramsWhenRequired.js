import {
  dec,
  equals,
  filter,
  length,
  lt,
  propSatisfies,
  when
} from 'ramda';

const endgramRequired = ({ unigrams, words }) => equals(
  length(unigrams),
  dec(words),
);
const whenEndgramRequired = when(endgramRequired);

// TODO: Reduce startgram/endgram predicate duplication
const greaterThanZero = lt(0);
const propGreaterThanZero = propSatisfies(greaterThanZero);
const isEndgram = propGreaterThanZero('_end');
const filterEndgram = filter(isEndgram);

const filterEndgrams = ({ corpus, ...props }) => ({
  ...props,
  corpus: filterEndgram(corpus),
});

const filterEndgramsWhenRequired = whenEndgramRequired(filterEndgrams);

export default filterEndgramsWhenRequired;
