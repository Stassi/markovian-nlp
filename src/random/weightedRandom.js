import Chance from 'chance';

// TODO: Rename to weighted
const weightedRandom = ({ values, weights }) => seed =>
  Chance(seed).weighted(values, weights);

export default weightedRandom;
