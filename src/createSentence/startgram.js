import {
  filter,
  lt,
  pipe,
  prop,
  propSatisfies,
} from 'ramda';
import followingUnigram from './followingUnigram';

const greaterThanZero = lt(0);
const propGreaterThanZero = propSatisfies(greaterThanZero);

const isStartgram = propGreaterThanZero('_start');
const startProp = prop('_start');

const findStartgram = pipe(
  filter(isStartgram),
  followingUnigram(startProp),
);

const unseededStartgram = ({ distribution, ...props }) => ({
  ...props,
  distribution,
  unseededStartgram: findStartgram(distribution),
});

const seedStartgram = ({
  unseededStartgram,
  seed,
  ...props
}) => ({
  ...props,
  seed,
  startgram: unseededStartgram(seed),
});

const startgram = pipe(
  unseededStartgram,
  seedStartgram,
);

export default startgram;
