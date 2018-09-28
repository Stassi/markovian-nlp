import Chance from 'chance';

const weightedRandom = ({ values, weights }) => seed =>
  Chance(seed).weighted(values, weights);

export default weightedRandom;
