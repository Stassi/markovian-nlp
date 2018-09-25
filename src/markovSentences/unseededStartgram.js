import Chance from 'chance';
import {
  filter,
  lt,
  pipe,
  propSatisfies,
  reduce,
  toPairs,
} from 'ramda';

const chance = (seed = NaN) => new Chance(seed);

const greaterThanZero = lt(0);
const propGreaterThanZero = propSatisfies(greaterThanZero);
const startgrams = propGreaterThanZero('_start');
const filterStartgrams = filter(startgrams);

const unseededStartgram = pipe(
  filterStartgrams,
  toPairs,
  reduce(
    ({ unigrams, weights }, [unigram, { _start: weight }]) => ({
      unigrams: [...unigrams, unigram],
      weights: [...weights, weight],
    }),
    {
      unigrams: [],
      weights: [],
    },
  ),
  ({ unigrams, weights }) => seed =>
    chance(seed).weighted(unigrams, weights),
);

export default unseededStartgram;
