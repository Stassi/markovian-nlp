import {
  filter,
  lt,
  map,
  omit,
  pipe,
  prop,
  propSatisfies,
} from 'ramda';
import { evolveSeedProp } from '../random';
import followingUnigram from './followingUnigram';

const greaterThanZero = lt(0);
const propGreaterThanZero = propSatisfies(greaterThanZero);

const isStartgram = propGreaterThanZero('_start');
const startProp = prop('_start');

const unseededStartgram = pipe(
  filter(isStartgram),
  followingUnigram(startProp),
);

const omitStart = omit(['_start']);
const mapOmitStart = map(omitStart);

// TODO: Partial application
const startgram = pipe(
  ({ distribution, seed }) => ({
    seed,
    distribution: mapOmitStart(distribution),
    startgram: unseededStartgram(distribution)(seed),
  }),
  evolveSeedProp,
);

export default startgram;
