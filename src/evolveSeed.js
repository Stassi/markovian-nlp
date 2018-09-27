import Chance from 'chance';

const evolveSeed = ({ seed }) => ({ seed: Chance(seed).integer() });

export default evolveSeed;
