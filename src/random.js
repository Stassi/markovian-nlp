import Chance from 'chance';

export const evolveSeed = seed => Chance(seed).integer();

export const weightedRandom = ({ values, weights }) => seed =>
  Chance(seed).weighted(values, weights);

const random = { evolveSeed, weightedRandom };

export default random;
