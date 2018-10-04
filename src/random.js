import Chance from 'chance';
import {
  dec,
  gte,
  ifElse,
  isNil,
  pipe,
  prop,
  repeat,
} from 'ramda';

export const evolveSeed = seed => Chance(seed).integer();

export const evolveSeedProp = ({ seed, ...props }) =>
  ({ ...props, seed: evolveSeed(seed) });

const isZeroOrLess = gte(0);
const countIsZeroOrLess = pipe(
  prop('count'),
  isZeroOrLess,
);

const seedsProp = prop('seeds');

const extendSeeds = ({
  seed,
  seeds = [],
  ...props
}) => ({
  ...props,
  seed,
  seeds: [...seeds, seed],
});

const decrementCount = ({ count, ...props }) => ({ ...props, count: dec(count) });

const endOrExtendSeeds = x => ifElse(
  countIsZeroOrLess,
  seedsProp,
  pipe(
    extendSeeds,
    decrementCount,
    evolveSeedProp,
    endOrExtendSeeds,
  ),
)(x);

// TODO: Pipe
const deterministic = ({ seed }) => !isNil(seed);

const fillNondeterministic = pipe(
  prop('count'),
  repeat(undefined),
);

export const evolveSeeds = ifElse(
  deterministic,
  endOrExtendSeeds,
  fillNondeterministic,
);

export const weightedRandom = ({ values, weights }) => seed =>
  Chance(seed).weighted(values, weights);

const random = {
  evolveSeed,
  evolveSeeds,
  evolveSeedProp,
  weightedRandom,
};

export default random;
