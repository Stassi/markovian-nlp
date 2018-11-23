import Chance from 'chance';

const weighted = ({ values, weights }) => seed =>
  Chance(seed).weighted(values, weights);

export default weighted;
