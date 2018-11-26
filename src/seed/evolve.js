import Chance from 'chance';

const evolve = ({ seed, ...props }) => ({
  ...props,
  seed: Chance(seed).integer(),
});

export default evolve;
