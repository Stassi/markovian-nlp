import Chance from 'chance';

export const evolveSeed = seed => Chance(seed).integer();

export const evolveSeedProp = ({ seed, ...props }) =>
  ({ ...props, seed: evolveSeed(seed) });

export const weightedRandom = ({ values, weights }) => seed =>
  Chance(seed).weighted(values, weights);

const random = {
  evolveSeed,
  evolveSeedProp,
  weightedRandom,
};

export default random;
