import {
  filter,
  lt,
  map,
  omit,
  pipe,
  propSatisfies,
  reduce,
  toPairs,
} from 'ramda';
import { evolveSeed, weightedRandom } from '../random';

const omitStart = omit(['_start']);
const mapOmitStart = map(omitStart);

const greaterThanZero = lt(0);
const propGreaterThanZero = propSatisfies(greaterThanZero);
const filterStartgrams = filter(propGreaterThanZero('_start'));

const unseededStartgram = pipe(
  filterStartgrams,
  // TODO: Reduce duplication
  toPairs,
  reduce(
    ({ values, weights }, [value, { _start: weight }]) => ({
      values: [...values, value],
      weights: [...weights, weight],
    }),
    {
      values: [],
      weights: [],
    },
  ),
  weightedRandom,
);

const startgram = ({ distribution, seed }) => ({
  distribution: mapOmitStart(distribution),
  seed: evolveSeed(seed),
  startgram: unseededStartgram(distribution)(seed),
});

export default startgram;
