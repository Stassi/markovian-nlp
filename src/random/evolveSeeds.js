import {
  dec,
  gte,
  ifElse,
  isNil,
  pipe,
  prop,
  repeat,
} from 'ramda';
import evolveSeedProp from './evolveSeedProp';

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

const evolveSeeds = ifElse(
  deterministic,
  endOrExtendSeeds,
  fillNondeterministic,
);

export default evolveSeeds;
